import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authorizationGuradGuard } from 'src/app/core/guard/authorization-gurad.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authorizationGuradGuard], // Protect the entire AuthModule
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // Add more routes as needed
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
