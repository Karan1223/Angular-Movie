import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faSearch, faPowerOff } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit   {

    // Define the Font Awesome icons here
    faSearch = faSearch;
    faPowerOff = faPowerOff;
  
    @Input() isScrolled = false;
  links = [
    { name: 'Home', link: '/' },
    { name: 'TV Shows', link: '/tv' },
    { name: 'Movies', link: '/movies' },
    { name: 'My List', link: '/mylist' },
  ];
  showSearch = false;
  inputHover = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        this.router.navigate(['/login']);
      }
    });
  }

  onSearchBlur(): void {
    if (!this.inputHover) {
      this.setShowSearch(false);
    }
  }

  setShowSearch(value: boolean): void {
    this.showSearch = value;
  }

  setInputHover(value: boolean): void {
    this.inputHover = value;
  }

  signOut(): void {
    signOut(firebaseAuth)
      .then(() => {
        // Handle successful sign-out
      })
      .catch((error) => {
        // Handle sign-out error
      });
  }

}
