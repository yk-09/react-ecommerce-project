export interface CartItem {
  id: string;
  productId: string;
  productQuantity: number;
  deliveryOptionId: string;
}

export interface DeliveryOptions {
  readonly id: string,
  deliveryDays: number, 
  shippingCost: number
}