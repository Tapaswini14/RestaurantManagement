import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';





@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  public fooditems: any[] = [
    {img: '../../assets/pizza.jpg', name: 'Pizza', price: 180 },
    {img: '../../assets/burger.jpg', name: 'Burger', price: 120 },
    {img: '../../assets/frech fries.jpg', name: 'French fries', price: 90 },
    {img: '../../assets/hotdog.avif', name: 'HotDog', price: 160 },
];

  constructor(private router: Router
    ){

    }

  
  private cartTotalSubject = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotalSubject.asObservable();
  cartTotal: number = 0;
  totalPrice: number = 0;

  cartItems: { name: string; price: number; quantity: number }[] = [];

  
  addToCart(foodItem: any) {
    this.cartTotal += 1;
    this.totalPrice += foodItem.price;
    this.cartTotalSubject.next(this.totalPrice);

    // Check if the item is already in the cart
    const existingCartItem = this.cartItems.find((item) => item.name === foodItem.name);

    if (existingCartItem) {
      // Increment quantity if the item is already in the cart
      existingCartItem.quantity++;
    } else {
      // Add the item to the cart if it's not present
      this.cartItems.push({ name: foodItem.name, price: foodItem.price, quantity: 1 });
    }
  }
  

  orderPage(){
    this.router.navigate(['/order-page']);
  }


  placeOrder() {
    alert('Ordered Successfully');
  }
}
