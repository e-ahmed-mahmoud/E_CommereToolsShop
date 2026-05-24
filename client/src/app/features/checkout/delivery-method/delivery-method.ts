import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { CheckoutService } from '../../../core/services/checkout.service';
import { CurrencyPipe } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CartService } from '../../../core/services/cart.service';
import { CheckoutDeliveryModel } from '../../../shared/models/checkout-delivery-model';

@Component({
  selector: 'app-delivery-method',
  imports: [MatRadioButton, MatRadioGroup, CurrencyPipe],
  templateUrl: './delivery-method.html',
  styleUrl: './delivery-method.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryMethod implements OnInit {
  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  deliveyCompletionStatus = output<boolean>();

  ngOnInit(): void {
    console.log('called delivery method component');
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (value) => {
        if (this.cartService.cart()?.deliveryMethodId) {
          const dm = value.find((dm) => dm.id === this.cartService.cart()?.deliveryMethodId);
          if (dm) {
            this.cartService.selectedDM.set(dm);
            this.deliveyCompletionStatus.emit(true);
          }
        }
      },
    });
  }

  updateDeliveryMethod(dm: CheckoutDeliveryModel) {
    this.cartService.selectedDM.set(dm);
    const cart = this.cartService.cart();
    if (cart) {
      cart.deliveryMethodId = dm.id;
      this.cartService.setCart(cart);
      this.deliveyCompletionStatus.emit(true);
    }
  }
}
