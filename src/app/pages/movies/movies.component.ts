import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { NetflixService } from 'src/app/netflix.service';
import { firebaseAuth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  isScrolled = false;
  movies: any[] = []; // Adjust the type based on your store structure
  genres: any[] = []; // Adjust the type based on your store structure

  constructor(
    private store: NetflixService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.getGenres().subscribe(
      (data: any)=>{
        if (Array.isArray(data.genres)) {
          this.genres = data.genres; // Assuming the genres array is under the 'genres' property
        }
      }
    ); // Assuming the equivalent action in the Angular store
    this.store.fetchMovies('movie').subscribe(
      (data)=>{
        this.movies = data
      }
    ); // Assuming the equivalent action in the Angular store


    window.addEventListener('scroll', this.handleScroll);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      // if (currentUser) navigate('/');
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.isScrolled = window.pageYOffset !== 0;
  };
  onMoviesSelected(movies: any[]): void {
    // Update the movies variable with the emitted data
    this.movies = movies;
  }
}
