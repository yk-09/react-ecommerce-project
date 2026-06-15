import {
  getCartBackend,
  addToCartBackend,
  updateCartItemQuantity,
} from "./cartApi";

export async function handleAddToCart(
  productId: string,
  productQuantity: number
) {
  try {
    const cart = await getCartBackend();

    const existingProduct = cart.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      const newQty =
        existingProduct.productQuantity + productQuantity;

      await updateCartItemQuantity(
        existingProduct,
        newQty
      );
    } else {
      await addToCartBackend(
        productId,
        productQuantity
      );
    }

    const updatedCart = await getCartBackend();

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}