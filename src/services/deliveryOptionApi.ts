import type { CartItem } from "../types/cart";
import axios from "axios";

const BASE_URL = "https://69d1185f90cd06523d5dd7c7.mockapi.io/cart";

export async function updateDeliveryOption(
  cartItem: CartItem,
  deliveryOptionId: string
) {
  const res = await axios.put(
    `${BASE_URL}/${cartItem.id}`,
    {
      ...cartItem,
      deliveryOptionId
    }
  );

  return res.data;
}