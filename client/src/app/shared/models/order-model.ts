export interface OrderModel {
  orderId: string;
  orderDate: string;
  bayerEmail: string;
  shippingAddress: ShippingAddress;
  deliveryMethod: string;
  paymentSummary: PaymentSummary;
  orderItems: OrderItem[];
  subTotal: number;
  orderStatus: string;
  paymentIntentId: string;
  shippingPrice: number;
}

export interface ShippingAddress {
  name: string;
  country: string;
  city: string;
  line1: string;
  line2?: string;
  postalCode: string;
}

export interface PaymentSummary {
  last4: number;
  brand: string;
  expMonth: number;
  expYear: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface CreateOrder {
  cartid: string;
  deliveryMethodId: string;
  shippingAddress: ShippingAddress;
  paymentSummary: PaymentSummary;
}
