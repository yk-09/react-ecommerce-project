import axios from "axios";
import type { CartItem } from "../types/cart";

const BASE_URL =
  "https://69d1185f90cd06523d5dd7c7.mockapi.io/cart";

export async function getCartBackend() {
  const res = await axios.get<CartItem[]>(BASE_URL);
  return res.data;
}

export async function addToCartBackend(
  productId: string,
  productQuantity: number
): Promise<CartItem> {
  const res = await axios.post<CartItem>(BASE_URL, {
    productId,
    productQuantity,
    deliveryOptionId: "1",
  });

  return res.data;
}

export async function updateCartItemQuantity(
  existingProduct: CartItem,
  newQty: number
): Promise<CartItem> {
  const res = await axios.put<CartItem>(
    `${BASE_URL}/${existingProduct.id}`,
    {
      productQuantity: newQty,
    }
  );

  return res.data;
}

export async function deleteCartItem(
  cartItemId: string
) {
  const response = await axios.delete(
    `${BASE_URL}/${cartItemId}`
  );

  return response.data;
}