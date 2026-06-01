import { inject, Injectable } from '@angular/core';
import {
  ConfirmationToken,
  loadStripe,
  Stripe,
  StripeAddressElement,
  StripeAddressElementOptions,
  StripeElements,
  StripePaymentElement,
} from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { ShopCart } from '../../shared/models/cartModel';
import { firstValueFrom, map } from 'rxjs';
import { AccountService } from './account.service';
import de from '@angular/common/locales/de';

@Injectable({
  providedIn: 'root',
})
export class StripService {
  baseUrl = environment.ApiUrl;

  cartService = inject(CartService);
  httpSerivce = inject(HttpClient);
  accountService = inject(AccountService);

  private readonly stripe: Promise<Stripe | null>;
  private elements?: StripeElements;
  private addressElement?: StripeAddressElement;
  private paymentElement?: StripePaymentElement;

  constructor() {
    this.stripe = loadStripe(environment.PublishableKey);
  }

  getStripeInstance() {
    return this.stripe;
  }

  async initializeElements() {
    if (!this.elements) {
      const strip = await this.getStripeInstance();
      if (strip) {
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = strip.elements({
          clientSecret: cart.clientSecert,
          appearance: { labels: 'floating' },
          locale: 'en',
        });
      } else {
        throw new Error('Strip has not been loaded');
      }
    }
    return this.elements;
  }

  async createAddressElement() {
    if (!this.addressElement) {
      const elements = await this.initializeElements();
      if (elements) {
        const user = this.accountService.currentUser();

        let defaultValues: StripeAddressElementOptions['defaultValues'] = {};

        if (user) {
          defaultValues.name = user.firstName + ' ' + user.lastName;
        }
        if (user?.address) {
          defaultValues.address = {
            country: user.address.country,
            city: user.address.city,
            line1: user.address.line1,
            postal_code: user.address.postalCode,
            state: '',
            line2: '',
          };
        }
        const options: StripeAddressElementOptions = {
          mode: 'shipping',
          defaultValues,
        };
        this.addressElement = elements.create('address', options);
      } else {
        throw new Error('ELement intance can not be created');
      }
    }
    return this.addressElement;
  }

  async createConfirmationToken() {
    const strip = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();
    if (result.error) {
      throw new Error(result.error.message);
    }
    if (strip) {
      return await strip.createConfirmationToken({ elements });
    } else {
      throw new Error('invalid operation at creating token');
    }
  }

  async confirmPayment(confirmationToken: ConfirmationToken) {
    const strip = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();
    if (result.error) {
      throw new Error(result.error.message);
    }
    const clientSecert = this.cartService.cart()?.clientSecert;
    if (strip && clientSecert) {
      return strip.confirmPayment({
        clientSecret: clientSecert,
        confirmParams: {
          confirmation_token: confirmationToken?.id,
        },
        redirect: 'if_required',
      });
    } else {
      throw new Error('invalid operation at creating token');
    }
  }

  async createPaymentElement() {
    if (!this.paymentElement) {
      const elements = await this.initializeElements();
      if (elements) {
        this.paymentElement = elements.create('payment');
      } else {
        throw new Error('Error in creating Strip elements');
      }
    }
    return this.paymentElement;
  }

  createOrUpdatePaymentIntent() {
    const cart = this.cartService.cart();
    if (!cart) throw new Error('problem with cart processing');

    return this.httpSerivce.post<ShopCart>(`${this.baseUrl}/payment/${cart.id}`, {}).pipe(
      map((res) => {
        this.cartService.cart.set(res);
        return res;
      }),
    );
  }

  resetElement() {
    this.elements = undefined;
    this.addressElement = undefined;
    this.paymentElement = undefined;
  }
}
