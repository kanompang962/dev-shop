import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-gurad.guard';
import { authorizationGuradGuard } from './core/guard/authorization-gurad.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
