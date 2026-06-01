import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { ShippingAddress } from '../models/order-model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value?: ConfirmationToken['shipping'] | ShippingAddress, ...args: unknown[]): unknown {
    if (value && 'address' in value && value?.address) {
      return `${value.name} , ${value.address.country} ,${value.address.city} , 
      ${value.address.line1} ${value.address.line2} , ${value.address.postal_code} `;
    } else if (value && 'city' in value) {
      return `${value.name} , ${value.country} ,${value.city} , 
      ${value.line1} ${value.line2 ?? ''} , ${value.postalCode} `;
    } else {
      return 'Unknown address';
    }
  }
}
