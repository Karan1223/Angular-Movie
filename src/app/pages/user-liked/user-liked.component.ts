import { Component, OnInit } from '@angular/core';
import { NetflixService, Movie } from '../../netflix.service'; // Update the path to your NetflixService

@Component({
  selector: 'app-user-liked',
  templateUrl: './user-liked.component.html',
  styleUrls: ['./user-liked.component.css']
})
export class UserLikedComponent implements OnInit {
  isScrolled = false;
  movies: Movie[] = [];

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    // Assuming you have access to the user's email in your component
    const userEmail = 'kpkaranpunjabi1223@gmail.com';
    let tempMovieCache: any;
    // Call the service method to get the user's liked movies
    this.netflixService.getUserLikedMovies(userEmail).subscribe(
      (movies) => {
        tempMovieCache = movies;
        console.log(typeof(tempMovieCache))
        if(typeof(tempMovieCache) == 'object') {
          if('movies' in tempMovieCache) {
            this.movies = tempMovieCache.movies;
          }
        }
        //this.movies = movies;
        console.log("data", this.movies); // Data is available here
        // Any code that relies on 'this.movies' should be placed here
      },
      (error) => {
        console.error('Error fetching user liked movies:', error);
      }
    );

    console.log(this.movies)
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset === 0 ? false : true;
    };
  }
}

