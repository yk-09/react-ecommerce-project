import type { CartItem } from "../types/cart";
import {
  addToCartBackend,
  updateCartItemQuantity,
} from "./cartApi";

export async function handleAddToCart(
  productId: string,
  productQuantity: number,
  cart: CartItem[]
): Promise<CartItem[]> {
  try {
    const existingProduct = cart.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      const newQty =
        existingProduct.productQuantity + productQuantity;

      const updatedItem =
        await updateCartItemQuantity(
          existingProduct,
          newQty
        );

      return cart.map((item) =>
        item.id === updatedItem.id
          ? updatedItem
          : item
      );
    }

    const newCartItem =
      await addToCartBackend(
        productId,
        productQuantity
      );

    return [...cart, newCartItem];

  } catch (error) {
    console.error(error);
    throw error;
  }
}