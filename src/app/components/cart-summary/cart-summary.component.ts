import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];
  

  constructor(private cartService:CartService, private toastrService:ToastrService, ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = this.cartService.list()
    console.log(this.cartItems);
  }
  removeFromCart(car:Car){
    this.cartService.removeFromCart(car);
    this.toastrService.success("Sepetten silindi", car.brandName +" " + "silindi!")
  }
}
