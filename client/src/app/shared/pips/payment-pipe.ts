import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';

@Pipe({
  name: 'payment',
})
export class PaymentPipe implements PipeTransform {
  transform(value?: ConfirmationToken['payment_method_preview'], ...args: unknown[]): string {
    if (value?.card) {
      return `${value.card.brand.toUpperCase()}  **** **** **** ${value.card.last4}, Exp Date: ${value.card.exp_month}-${value.card.exp_year}`;
    }
    return 'card not defined';
  }
}
