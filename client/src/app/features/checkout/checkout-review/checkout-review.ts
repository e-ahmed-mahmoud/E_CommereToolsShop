import { Component, inject, input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { AddressPipe } from '../../../shared/pips/address-pipe';
import { ConfirmationToken } from '@stripe/stripe-js';
import { PaymentPipe } from '../../../shared/pips/payment-pipe';

@Component({
  selector: 'app-checkout-review',
  imports: [CurrencyPipe, AddressPipe, PaymentPipe],
  templateUrl: './checkout-review.html',
  styleUrl: './checkout-review.css',
})
export class CheckoutReview {
  cartServices = inject(CartService);

  confirmationToken = input.required<ConfirmationToken | undefined>();
}
