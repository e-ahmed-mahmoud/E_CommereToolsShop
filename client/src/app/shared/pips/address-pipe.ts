import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value?: ConfirmationToken['shipping'], ...args: unknown[]): unknown {
    if (value?.address && value.name) {
      console.log(value);
      return `${value.name} , ${value.address.country} ,${value.address.city} , 
      ${value.address.line1} ${value.address.line2} , ${value.address.postal_code} `;
    } else {
      return 'Unknown address';
    }
  }
}
