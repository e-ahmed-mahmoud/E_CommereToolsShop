import { Component, inject, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { OrderSummary } from '../../shared/shop/order-summary/order-summary';
import { MatStepper, MatStep, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { StripService } from '../../core/services/strip.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import {
  ConfirmationToken,
  StripeAddressElement,
  StripeAddressElementChangeEvent,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Address } from '../../shared/models/user';
import { AccountService } from '../../core/services/account.service';
import { firstValueFrom, Observable } from 'rxjs';
import { DeliveryMethod } from './delivery-method/delivery-method';
import { CheckoutReview } from './checkout-review/checkout-review';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateOrder, ShippingAddress } from '../../shared/models/order-model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout.component',
  imports: [
    OrderSummary,
    MatStepper,
    MatStep,
    RouterLink,
    MatAnchor,
    MatStepperNext,
    MatCheckbox,
    MatStepperPrevious,
    DeliveryMethod,
    CheckoutReview,
    CurrencyPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  stripService = inject(StripService);
  snackbartService = inject(SnackbarService);
  accountService = inject(AccountService);
  cartServices = inject(CartService);
  router = inject(Router);
  orderSerivce = inject(OrderService);

  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;

  isDefaultAddressChecked = signal<boolean>(false);

  confirmationToken = signal<ConfirmationToken | undefined>(undefined);

  completionStatus = signal<{
    adressComplete: boolean;
    deliveryComplete: boolean;
    paymentMethodComp: boolean;
  }>({ adressComplete: false, deliveryComplete: false, paymentMethodComp: false });

  loading = signal<boolean>(false);

  async ngOnInit() {
    try {
      this.addressElement = await this.stripService.createAddressElement();
      this.addressElement.mount('#shippingAddress');
      this.paymentElement = await this.stripService.createPaymentElement();
      this.paymentElement?.mount('#paymentElement');

      this.addressElement.on('change', this.handleAddressChange);
      this.paymentElement.on('change', this.handlePaymentChange);
    } catch (error: any) {
      this.snackbartService.error(error);
    }
  }

  async getConfirmationToken() {
    this.loading.set(true);
    try {
      if (Object.values(this.completionStatus()).every((st) => st === true)) {
        const result = await this.stripService.createConfirmationToken();
        if (result.error?.message) throw new Error(result.error.message);
        if (result.confirmationToken) {
          this.confirmationToken.set(result.confirmationToken);
        }
      }
    } catch (error: any) {
      this.snackbartService.error(error.message);
    }
    this.loading.set(false);
  }

  async confirmPayment(stepper: MatStepper) {
    try {
      const token = this.confirmationToken();
      if (token) {
        const confirm = await this.stripService.confirmPayment(token);
        if (confirm.paymentIntent?.status === 'succeeded') {
          const order = await this.createOrderModel();
          const res = await firstValueFrom(this.orderSerivce.createOrder(order));
          if (res) {
            this.cartServices.deleteCart();
            this.cartServices.selectedDM.set(undefined);
            this.orderSerivce.orderComplete.set(true);
            this.router.navigateByUrl('checkout/success');
          } else {
            throw new Error('Order failed to created');
          }
        } else if (confirm.error) {
          throw new Error(confirm.error.message);
        } else {
          throw new Error('Error in processing payment with Strip');
        }
      }
    } catch (error: any) {
      this.snackbartService.error(error.message);
      stepper.previous();
    }
  }

  async onStepperIndexChange($event: StepperSelectionEvent) {
    console.log($event.selectedIndex);
    if ($event.selectedIndex === 1) {
      const address = await this.getStripAddress();
      if (this.isDefaultAddressChecked()) {
        address && firstValueFrom(this.accountService.updateAddress(address));
      }
    }
    if ($event.selectedIndex === 2) {
      await firstValueFrom(this.stripService.createOrUpdatePaymentIntent());
    }
    if ($event.selectedIndex === 3) {
      var token = await this.getConfirmationToken();
    }
  }

  onCheckedDefaultAddress($event: MatCheckboxChange) {
    this.isDefaultAddressChecked.set($event.checked);
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update((cur) => ({ ...cur, adressComplete: event.complete }));
  };

  handleDeliveryChange(event: boolean) {
    this.completionStatus.update((cur) => ({ ...cur, deliveryComplete: event }));
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update((cur) => ({ ...cur, paymentMethodComp: event.complete }));
  };

  private async getStripAddress(): Promise<Address | ShippingAddress | null> {
    const stripeAddress = await this.addressElement?.getValue();
    if (stripeAddress?.value.address) {
      return {
        name: stripeAddress.value.name,
        line1: stripeAddress?.value.address.line1,
        country: stripeAddress?.value.address.country,
        city: stripeAddress?.value.address.city,
        postalCode: stripeAddress?.value.address.postal_code,
      };
    } else {
      return null;
    }
  }

  private async createOrderModel(): Promise<CreateOrder> {
    const cart = this.cartServices.cart();
    const shippingAddress = (await this.getStripAddress()) as ShippingAddress;
    const pyamentCard = this.confirmationToken()?.payment_method_preview.card;
    if (!cart?.id || !shippingAddress || !pyamentCard || !cart.deliveryMethodId) {
      throw new Error('invalid shopping cart');
    }
    return {
      cartid: cart.id,
      deliveryMethodId: cart.deliveryMethodId,
      shippingAddress: shippingAddress,
      paymentSummary: {
        brand: pyamentCard.brand,
        last4: +pyamentCard.last4,
        expMonth: pyamentCard.exp_month,
        expYear: pyamentCard.exp_year,
      },
    };
  }

  ngOnDestroy() {
    this.stripService.resetElement();
  }
}
