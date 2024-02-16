import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getSession, setSession } from 'src/app/core/funcs/sessionService';
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
          setSession('user', JSON.stringify(res))
          this.sweetAlertService.showAlert('Success','Login Success')
          const user = getSession('user');
          if (user.token) {
            if (user.data.RoleID === 1) {
              this.router.navigate(['/admin']);
            }else {
              this.router.navigate(['/']);
            }
          }
        }
      })
    } 
  }
}
