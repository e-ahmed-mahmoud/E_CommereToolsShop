import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { OrderModel } from '../../shared/models/order-model';
import { RouterLinkActive, RouterLinkWithHref, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  orderService = inject(OrderService);
  orders = signal<OrderModel[] | undefined>([]);

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
      },
    });
  }
}
