import axios from "axios";
import dayjs from "dayjs";
import type { CartItem } from "../types/cart";
import type { Order } from '../types/order';

export async function createOrder(
  cart: CartItem[],
  grandTotal: number
) {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderData: Order = {
    orderId: crypto.randomUUID(),
    orderTime: dayjs().toISOString(),
    products: cart,
    totalPrice: grandTotal,
  };

  const response = await axios.post(
    "https://69ada80eb50a169ec87fef13.mockapi.io/orders",
    orderData
  );

  return response.data;
}