import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of } from 'rxjs';
import { switchMap,  filter, take, toArray, mergeMap, tap } from 'rxjs/operators';

import { TMDB_BASE_URL, API_KEY } from './utils/constants';

export interface Movie {
  id: number;
  name: string;
  image: string;
  genre: string[];
}

interface Genre {
  id: number;
  name: string;
}
interface GenreObjectArray {
  genre: [
    {
    id: number,
    name: string
  }
  ]
}

@Injectable({
  providedIn: 'root',
})
export class NetflixService {
  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    const data = this.http.get<Genre[]>(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    console.log("api data: ", data)
    return data
  }

  fetchMovies(type: string): Observable<Movie[]> {
    return this.getGenres().pipe(
      tap((genres) => console.log('Genres:', genres)),
      switchMap((genres) =>
        this.getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)
      )
    ).pipe(
      tap((movies) => console.log('Movies received:', movies))
    );
  }

  fetchDataByGenre(genre: number, type: string): Observable<Movie[]> {
    return this.getGenres().pipe(
      switchMap((genres) =>
        this.getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres)
      )
    );
  }

  getUserLikedMovies(email: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`https://backendmovieflix.onrender.com/api/user/liked/${email}`);

  }

  removeMovieFromLiked(movieId: number, email: string): Observable<Movie[]> {
    return this.http.put<Movie[]>('https://backendmovieflix.onrender.com/api/user/delete', { email, movieId });
  }

  private createArrayFromRawData(array: any[], genres: Genre[]): Movie[] {
    const moviesArray: Movie[] = [];

    let tempGenre: any
    tempGenre = genres
    if (typeof(tempGenre) == 'object') {
      if ('genres'in tempGenre) {
        genres = tempGenre.genres
      }
    }
    array.forEach((movie) => {
      const movieGenres: string[] = [];
      movie.genre_ids.forEach((genre: any) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });

      if (movie.backdrop_path) {
        const movieData: Movie = {
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genre: movieGenres.slice(0, 3),
        };
        moviesArray.push(movieData);
      }
    });

    return moviesArray;
  }
  private async getRawData(api: string, genres: Genre[], paging = false): Promise<Movie[]> {
    const moviesArray: Movie[] = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const response: any = await this.http
        .get<any[]>(`${api}${paging ? `&page=${i}` : ''}`)
        .toPromise();

      // Check if response.results is defined before using it
      if (response && response.results) {
        this.createArrayFromRawData(response.results, genres).forEach((movie) => {
          if (moviesArray.length < 60) {
            moviesArray.push(movie);
          }
        });
      }
    }
    return moviesArray;
  }


}
