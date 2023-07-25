import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getAuth, User, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { firebaseAuth } from '../../firebase-config';

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

  isHovered: boolean = false;
  addedToList: boolean = false;
  alreadyExists: boolean = false;
  email: string | null = null;
  private authSubscription: Unsubscribe| undefined;

  constructor(private router: Router, private http: HttpClient) { }

  movieNameIdArray: { id: string; name: string }[] = [
    { id: 'videoId1', name: 'Movie 1' },
    { id: 'videoId2', name: 'Movie 2' },
    // Add more movies as needed
  ];

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

  removeFromLiked(): void {
    // Implement logic to remove movie from liked list
  }

  getVideoId(name: string): string {
    const movie = this.movieNameIdArray.find((movie) => movie.name === name);
    return movie ? movie.id : '';
  }
  handlePlayButtonClick(): void {
    const videoId = this.getVideoId(this.movieData.name);
    this.router.navigate(['/player'], { state: { videoId } });
  }
}
