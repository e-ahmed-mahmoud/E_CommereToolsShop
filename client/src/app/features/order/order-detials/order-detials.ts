import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderModel } from '../../../shared/models/order-model';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressPipe } from '../../../shared/pips/address-pipe';
import { PaymentPipe } from '../../../shared/pips/payment-pipe';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-order-detials',
  imports: [CurrencyPipe, DatePipe, AddressPipe, PaymentPipe, MatCard, MatButton],
  templateUrl: './order-detials.html',
  styleUrl: './order-detials.css',
})
export class OrderDetials implements OnInit {
  orderSerivce = inject(OrderService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  order = signal<OrderModel | undefined>(undefined);

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.orderSerivce.getOrdersById(id).subscribe({
      next: (order) => this.order.set(order),
    });
  }
  onReturnClick() {
    this.router.navigateByUrl('/orders');
  }
}
