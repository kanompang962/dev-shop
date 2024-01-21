import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';

const routes: Routes = [{
   path: '', component: UserComponent, 
   children: [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'about', component:AboutComponent},
   ] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
