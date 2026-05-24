import { nanoid } from 'nanoid';
import { Product } from './product';

export interface CartModel {
  id: string;
  items: CartItem[];
  deliveryMethodId: string | null;
  clientSecert: string;
  paymentIntentId: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export class ShopCart implements CartModel {
  id: string = nanoid();
  items: CartItem[] = [];
  deliveryMethodId: string | null = null;
  clientSecert = '';
  paymentIntentId = '';
}

export function MapProductToCartItem(product: Product): CartItem {
  return { ...product, productId: product.id, productName: product.name, quantity: 0 };
}
