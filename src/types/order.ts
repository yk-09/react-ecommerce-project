import type { CartItem } from "./cart";

export interface Order {
  orderId: string,
  orderTime: string,
  products: CartItem[],
  totalPrice: number
}