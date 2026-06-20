import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { ShopCart } from '../../shared/models/cartModel';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { SignalRService } from './signalr.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private cartService = inject(CartService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private signalrService = inject(SignalRService);
  init() {
    const cart_id = localStorage.getItem('cart_id');
    const cart$ = cart_id ? this.cartService.getCart(cart_id) : of(null);

    const user$ = this.accountService.getUserInfo().pipe(
      catchError((res) => {
        return this.router.navigateByUrl('/account/login');
      }),
      tap((res) => {
        if (res) {
          this.signalrService.createHubConnection();
          this.accountService.getUserRoles().subscribe();
        }
      }),
    );

    return forkJoin({ cart: cart$, user: user$ }); //must return observable
  }
}
