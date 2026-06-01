import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { OrderService } from '../../../core/services/order.service';
import { OrderModel } from '../../../shared/models/order-model';
import { SignalRService } from '../../../core/services/signalr.service';
import { PaymentPipe } from '../../../shared/pips/payment-pipe';
import { AddressPipe } from '../../../shared/pips/address-pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-checkout-success',
  imports: [
    MatButton,
    RouterLink,
    DatePipe,
    PaymentPipe,
    AddressPipe,
    MatProgressSpinner,
    CurrencyPipe,
  ],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess implements OnInit, OnDestroy {
  accountService = inject(AccountService);

  orderService = inject(OrderService);
  signalrService = inject(SignalRService);

  order = signal<OrderModel | undefined>(undefined);

  shippingDate = signal<Date>(new Date());

  ngOnInit(): void {
    this.shippingDate.update((cur) => {
      cur.setDate(cur.getDate() + 2);
      return cur;
    });
  }
  ngOnDestroy(): void {
    this.orderService.orderComplete.set(false);
    this.signalrService.order.set(undefined);
  }
}
