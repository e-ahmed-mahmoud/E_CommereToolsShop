import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-checkout-success',
  imports: [MatButton, RouterLink, DatePipe],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess implements OnInit {
  accountService = inject(AccountService);

  shippingDate = signal<Date>(new Date());

  ngOnInit(): void {
    this.shippingDate.update((cur) => {
      cur.setDate(cur.getDate() + 2);
      return cur;
    });

    console.log(this.shippingDate());
  }
}
