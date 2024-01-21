import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup|any;
  my_username = 'admin';
  my_password = '123'

  constructor(
    private fb: FormBuilder,
    private router:Router
    ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Perform login logic here
      if ( this.loginForm.value['username'] === this.my_username && this.loginForm.value['password'] === this.my_password) {
        sessionStorage.setItem('user',JSON.stringify({
          username:this.loginForm.value['username'],
          password:this.loginForm.value['password']
        }))
        this.router.navigate(['/']);
        console.log('Login successful!', this.loginForm.value);
      }
    } else {
      console.log('Form is invalid. Please fill in all fields.');
    }
  }
}
