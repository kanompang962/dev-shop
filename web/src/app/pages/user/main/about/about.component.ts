import { Component, OnInit } from '@angular/core';
import { StateCartService } from 'src/app/services/state-cart.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{
  cart_amount: any;
  constructor(private stateCartService:StateCartService){}
  ngOnInit(): void {
    this.stateCartService.currentState$.subscribe((state) => {
      this.cart_amount = state;
    });
  }
  title = "about"
}
