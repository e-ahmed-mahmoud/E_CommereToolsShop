import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CheckoutDeliveryModel } from '../../shared/models/checkout-delivery-model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.ApiUrl;

  private http = inject(HttpClient);
  deliveryMethods = signal<CheckoutDeliveryModel[]>([]);

  getDeliveryMethods(): Observable<CheckoutDeliveryModel[]> {
    if (this.deliveryMethods().length > 0) return of(this.deliveryMethods());

    return this.http.get<CheckoutDeliveryModel[]>(`${this.baseUrl}/Payment/delivery-methods`).pipe(
      map((value) => {
        this.deliveryMethods.set([...value].sort((a, b) => b.price - a.price));
        return value;
      }),
    );
  }
}
