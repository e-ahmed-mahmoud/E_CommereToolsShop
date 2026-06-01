import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateOrder, OrderModel } from '../../shared/models/order-model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.ApiUrl;
  private http = inject(HttpClient);
  orderComplete = signal<boolean>(false);

  createOrder(createOrder: CreateOrder) {
    return this.http.post<OrderModel>(`${this.baseUrl}/orders`, createOrder);
  }

  getUserOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.baseUrl}/orders`);
  }

  getOrdersById(id: string) {
    return this.http.get<OrderModel>(`${this.baseUrl}/orders/${id}`);
  }
}
