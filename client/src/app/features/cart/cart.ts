import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ShopCartItem } from './shop-cart-item/shop-cart-item';
import { OrderSummary } from '../../shared/shop/order-summary/order-summary';
import { EmptyCard } from '../../shared/shop/empty-card/empty-card';

@Component({
  selector: 'app-cart',
  imports: [ShopCartItem, OrderSummary, EmptyCard],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartService = inject(CartService);

  ngOnInit(): void {
    //this.cartItems.set(this.cartService.cart() ?? []);
  }
}
