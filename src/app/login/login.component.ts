import { Component, OnInit } from '@angular/core';
import { db } from '../../utils/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alert: boolean = false;
  alert1: boolean = false;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this._createForm()
  }

  private _createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    })
  }

  ngOnInit(): void {
  }
  get _email() {
    return this.loginForm.get('email')
  }

  get _password() {
    return this.loginForm.get('password')
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/tours'])
        console.log(user);
        this.alert = true
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.alert1 = true
      });
  }
  async closeAlert(){
    this.alert = false
    this.alert1 = false
  }
}
