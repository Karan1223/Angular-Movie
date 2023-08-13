import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getAuth, User, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { Movie, NetflixService } from 'src/app/netflix.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() movieData: any;
  @Input() isLiked: boolean = false;
  @Input() key: any;
  @Input() index!: number; 

  isHovered = false;
  addedToList = false;
  alreadyExists = false;
  email: string | null = null;
  private authSubscription: Unsubscribe| undefined;

  constructor(private router: Router, private http: HttpClient, private  netflixService: NetflixService) { }

router1 = new Router();
  ngOnInit(): void {
    const auth = getAuth();
    this.authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription(); // Call the function returned by onAuthStateChanged to unsubscribe
    }
  }
  addToList(): void {
    this.http.post<any>('https://backendmovieflix.onrender.com/api/user/add', { email: this.email, data: this.movieData })
      .subscribe(response => {
        if (response.msg === 'Movie already added to the list.') {
          this.alreadyExists = true; // Set alreadyExists to true when movie already exists
        } else {
          this.addedToList = true; // Set addedToList to true when movie is successfully added
        }
      }, error => {
        console.log(error);
      });
  }
 
  removeMovieFromLiked(): void {
    // Provide a default value for email when it's null
    const email = this.email || '';
    this.netflixService.removeMovieFromLiked(this.movieData.id, email).subscribe(
      (updatedLikedMovies: Movie[]) => {
        // Handle the response here if needed
        
        console.log('Movie removed from liked list:', this.movieData);
        this.router.navigate(['/mylist']);
      },
      (error) => {
        console.error('Error removing movie from liked list:', error);
      }
    );
  }
  getVideoId(name: string): string {
    const movieNameIdArray = [
      { name: 'Extraction 2', id: 'Y274jZs5s7s' },
      { name: 'Spider-Man: Across the Spider-Verse', id: 'shW9i6k8cB0' },
      { name: 'Fast X', id: 'eoOaKN4qCKw' },
      { name: 'Indiana Jones and the Dial of Destiny', id: 'eQfMbSe7F2g' },
      { name: 'Secret Invasion', id: 'Tp_YZNqNBhw' },
      { name: 'The Witcher', id: 'SzS8Ao0H6Co' },
      { name: 'The Flash', id: 'jprhe-cWKGs' },
      // Add more movie names and IDs as needed
    ];
    const movie = movieNameIdArray.find((movie) => movie.name === name);
    return movie ? movie.id : '';
  }
  handlePlayButtonClick(): void {
    const videoId = this.getVideoId(this.movieData.name);
    this.router.navigate(['/player'], { queryParams: { videoId: videoId } });
  }
}
