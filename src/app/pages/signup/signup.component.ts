import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase-config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  formValues = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) this.router.navigate(['/']);
    });
  }

  async handleSignIn() {
    try {
      const { email, password } = this.formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  }
}
