import { Component, OnInit } from '@angular/core';
import { NetflixService, Movie } from '../../netflix.service'; // Update the path to your NetflixService
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-liked',
  templateUrl: './user-liked.component.html',
  styleUrls: ['./user-liked.component.css']
})
export class UserLikedComponent implements OnInit {
  isScrolled = false;
  movies: Movie[] = [];
  email: string | null = null;
  authSubscription: any; 

  constructor(private netflixService: NetflixService, private router: Router) { }

  ngOnInit() {
    const auth = getAuth();
    this.authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
        this.getUserLikedMovies();
      } else {
        this.email = null;
        this.movies = []; // Reset movies when there is no user logged in.
      }
    });
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset === 0 ? false : true;
    };
  }

  getUserLikedMovies() {
    console.log("Email: ",this.email)
    if (this.email) {
      this.netflixService.getUserLikedMovies(this.email).subscribe(
        (movies) => {
          console.log(movies)
          const tempMovieCache: any = movies;
          if (typeof (tempMovieCache) === 'object' && 'movies' in tempMovieCache) {
            this.movies = tempMovieCache.movies;
            console.log(this.movies)
          }
        },
        (error) => {
          console.error('Error fetching user liked movies:', error);
        }
      );
    }
  }

  
}

