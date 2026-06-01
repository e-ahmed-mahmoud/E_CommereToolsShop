import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { PaymentSummary } from '../models/order-model';

@Pipe({
  name: 'payment',
})
export class PaymentPipe implements PipeTransform {
  transform(
    value?: ConfirmationToken['payment_method_preview'] | PaymentSummary,
    ...args: unknown[]
  ): string {
    if (value && 'card' in value && value?.card) {
      return `${value.card.brand.toUpperCase()}  **** **** **** ${value.card.last4}, Exp Date: ${value.card.exp_month}-${value.card.exp_year}`;
    } else if (value && 'brand' in value) {
      return `${value.brand.toUpperCase()}  **** **** **** ${value.last4}, Exp Date: ${value.expMonth}-${value.expYear}`;
    }
    return 'card not defined';
  }
}
