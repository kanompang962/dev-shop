import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getSession } from 'src/app/core/funcs/sessionService';
import { User } from 'src/app/core/models/user.model';
import { StateCartService } from 'src/app/services/state-cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = "navbar"
  settings:any;
  navbars:any;
  cart_amount = 0;

  user: User | undefined;

  constructor(
    private http: HttpClient,
    private stateCartService: StateCartService,
    private router: Router,
    ) {}

  ngOnInit() {
   this.fetchSettingsMenu();
   this.fetchNavbarsMenu();
   this.getCartAmount();
   this.getUser();
  }

  getUser(){
    this.user = getSession('user')
  }

  fetchSettingsMenu(){
    this.http.get('assets/data/settings.json').subscribe(data => {
      this.settings = data;
    });
  }
  
  fetchNavbarsMenu(){
    this.http.get('assets/data/navbars.json').subscribe(data => {
      this.navbars = data;
    });
  }

  getCartAmount(){
    this.stateCartService.currentState$.subscribe((state) => {
      this.cart_amount = state;
    });
  }
  
  signIn(){
    this.router.navigate(['/auth'])
  }

  logOut(){
    sessionStorage.removeItem('user')
   window.location.reload()
  }
}
