import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getSession } from 'src/app/core/funcs/sessionService';
import { ProductsService } from 'src/app/services/products.service';
import { StateCartService } from 'src/app/services/state-cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private stateCartService:StateCartService,
    private router:Router
    ) {}

  title = "home"
  products:any;
  cart_amount = 0;

  ngOnInit(): void {
    this.fetchProducts();
    this.getCartAmount();
  }

  fetchProducts(){
    this.http.get('assets/data/products.json').subscribe(data => {
      this.products = data;
    });
  }


  getCartAmount(){
    this.stateCartService.currentState$.subscribe((state) => {
      this.cart_amount = state;
    });
  }

  updateState() {
    if (!getSession('user')) {
      this.router.navigate(['/auth']);
    }else{
      const newState =  this.cart_amount += 1;
      this.stateCartService.updateState(newState);
    }
  }

}
