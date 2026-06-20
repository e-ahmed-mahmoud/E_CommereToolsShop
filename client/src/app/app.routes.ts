import { Routes } from '@angular/router';
import { NotFound } from './shared/not-found/not-found';
import { ServerError } from './shared/server-error/server-error';
import { authGuard } from './core/guards/auth.guard';
import { canCheckoutGuard } from './core/guards/can-checkout-guard';
import { orderCompleteGuard } from './guards/order-complete-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then((c) => c.Home) },
  { path: 'shop', loadComponent: () => import('./features/shop/shop').then((c) => c.Shop) },
  {
    path: 'shop/:id',
    loadComponent: () =>
      import('./features/product-details/product-details').then((c) => c.ProductDetails),
  },
  { path: 'cart', loadComponent: () => import('./features/cart/cart').then((c) => c.Cart) },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
    canActivate: [authGuard, canCheckoutGuard],
  },
  {
    path: 'checkout/success',
    loadComponent: () =>
      import('./features/checkout/checkout-success/checkout-success').then(
        (c) => c.CheckoutSuccess,
      ),
    canActivate: [authGuard, orderCompleteGuard],
  },
  {
    path: 'addProduct',
    loadComponent: () => import('./features/product-form/product-form').then((c) => c.ProductForm),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/order/order').then((c) => c.Order),
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./features/order/order-detials/order-detials').then((c) => c.OrderDetials),
    canActivate: [authGuard],
  },
  {
    path: 'account/login',
    loadComponent: () => import('./features/account/login/login').then((c) => c.Login),
  },
  {
    path: 'account/register',
    loadComponent: () => import('./features/account/register/register').then((c) => c.Register),
  },
  { path: 'not-found', component: NotFound },
  { path: 'server-error', component: ServerError },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
