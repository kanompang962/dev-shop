import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

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
    private router:Router,
    private authService:AuthService,
    private sweetAlertService:SweetAlertService,
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
      const data = this.loginForm.value
      this.authService.login(data).subscribe((res)=>{
        if (res) {
          sessionStorage.setItem('user',JSON.stringify({
            username:this.loginForm.value['username'],
            password:this.loginForm.value['password']
          }))
          this.sweetAlertService.showAlert('Success','Login Success')
          this.router.navigate(['/admin']);
        }
      
      })
      console.log(this.loginForm.value);
      
    } 
  }
}
