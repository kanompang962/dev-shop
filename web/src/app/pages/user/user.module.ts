import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule
  ]
})
export class UserModule { }
