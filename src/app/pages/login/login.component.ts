import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: string | undefined;
  showPassword: boolean = false;
  formValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if the user is already logged in (optional)
    const auth = getAuth();
    if (auth.currentUser) {
      this.router.navigate(['/']);
    }
  }

  handleTogglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleLogIn() {
    const { email, password } = this.formValues;
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        this.errors = 'Incorrect Email and Password';
        console.log(error);
      });
  }

}
