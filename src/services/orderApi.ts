import axios from "axios";
import dayjs from "dayjs";
import type { CartItem } from "../types/cart";
import type { Order } from '../types/order';

const BASE_URL = "https://69ada80eb50a169ec87fef13.mockapi.io/orders";

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
    BASE_URL,
    orderData
  );

  return response.data;
}

export async function getOrders() {
  const response = await axios.get<Order[]>(BASE_URL);

  return response.data;
}