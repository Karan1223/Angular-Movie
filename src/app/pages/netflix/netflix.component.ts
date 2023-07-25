import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Import the required icons

import { NetflixService } from '../../netflix.service';


@Component({
  selector: 'app-netflix',
  templateUrl: './netflix.component.html',
  styleUrls: ['./netflix.component.css']
})
export class NetflixComponent implements OnInit {
  movies: any[] = [];
  genresLoaded = false;
  genres: any[] = [];

  isScrolled = false;

  faPlay = faPlay; // Define the Font Awesome icons
  faInfoCircle = faInfoCircle;
  

  constructor(private  netflixService: NetflixService,private router: Router) {}



 ngOnInit(): void {
    this.fetchMovies();
  }
 fetchMovies(): void {
   this.netflixService.fetchMovies('all').subscribe((movies) => {
     this.movies = movies;
   });
 }


  handlePlayButton(): void {
    const videoId = 'mVsJXiI60a0';
    this.router.navigate(['/player'], { queryParams: { videoId: videoId } });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset === 0 ? false : true;
  }
}
