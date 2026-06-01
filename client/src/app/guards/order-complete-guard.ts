import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';

export const orderCompleteGuard: CanActivateFn = (route, state) => {
  const orderSerivce = inject(OrderService);
  const router = inject(Router);

  if (orderSerivce.orderComplete()) {
    return true;
  } else {
    router.navigateByUrl('/shop');
    return false;
  }
};
