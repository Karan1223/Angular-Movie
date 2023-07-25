import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoginPage: boolean;

  constructor(private router: Router) {
    this.isLoginPage = this.router.url === '/login';
  }

  handleClick() {
    if (this.isLoginPage) {
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
