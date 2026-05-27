const cartData = localStorage.getItem('kamnaCart') || '[]';
export const cart: CartItem[] = JSON.parse(cartData);

const BASE_URL = "https://69d1185f90cd06523d5dd7c7.mockapi.io/cart";

export function addToHart(productId: string, productQuantity: number){
  console.log(productId);
  console.log(productQuantity);

  // working
  getCartBackend(productQuantity, productId);
}

async function addToCartBackend(productId: string, productQuantity: number){

  try{
    console.log('loading');

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId,
        productQuantity,
        deliveryOptionId : '1'
      })
    });

    if(!response.ok){
      throw new Error(`Unexpected error! http status: ${response.status}`); 
    }

    const cart = await response.json();
    console.log(cart);
    getCartBackend()
      .then((cart) => {
        const cartQuantityLdEl = document.querySelector('.js-cart-quantity-ld') as HTMLSpanElement;
        const cartQuantitySdEl = document.querySelector('.js-cart-quantity-sd') as HTMLSpanElement;

        const cartQuantity: number = updateCartQuantity(cart);
        cartQuantityLdEl.innerText = cartQuantity.toString();
        cartQuantitySdEl.innerText = cartQuantity.toString();
      });
  }catch(e){
    console.error(e);
  }
}

export async function getCartBackend(productQuantity?: number, productId?: string){

  try{
    console.log('loading');
    const response = await fetch(BASE_URL);

    if(!response.ok){
      throw new Error(`Unexpected error! http status: ${response.status}`);
    }

    const cart = await response.json();
    console.log(cart);

    if(productQuantity && productId){
      updateCart(cart, productQuantity, productId);
    }else{
      saveToStorage(cart);
      return cart
    }
  }catch(e){
    console.error(e);
  }
}

function updateCart(cart: CartItem[], productQuantity: number, productId: string){
  let existingProduct: CartItem | undefined;
  // let cartItemId: string | undefined;
  cart.forEach(cartItem => {

    if(cartItem.productId === productId){
      existingProduct = cartItem;
      // cartItemId = existingProduct.id;
      console.log(existingProduct);
      // console.log(cartItemId);
    };
  });

  if(existingProduct /* && cartItemId */){
    const newQty = existingProduct.productQuantity + productQuantity;
    updateCartItemQuantity(newQty, /*cartItemId*/ existingProduct);
  }else{
    addToCartBackend(productId, productQuantity);
  }
};
 
export async function updateCartItemQuantity(newQty: number, /*cartItemId: string*/ existingProduct: CartItem){

  const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${existingProduct.id}`;
  try{
    // console.log(cartItemId);
    console.log('loading');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productQuantity: newQty
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.status}`);
    }

    const updatedData = await response.json();
    console.log(updatedData);
    console.log('Update successful:', updatedData);
    getCartBackend()
      .then((cart) => {
        const cartQuantityLdEl = document.querySelector('.js-cart-quantity-ld') as HTMLSpanElement;
        const cartQuantitySdEl = document.querySelector('.js-cart-quantity-sd') as HTMLSpanElement;

        const cartQuantity: number = updateCartQuantity(cart);
        cartQuantityLdEl.innerText = cartQuantity.toString();
        cartQuantitySdEl.innerText = cartQuantity.toString();
      });
  }catch(e){
    console.error('Error updating cart:', e);
  }
}

export async function updateDeliveryOption(
  cartItemId: string,
  newDeliveryOptionId: string
) {
  try {
    // 1. The URL usually includes the ID of the item you are updating
    const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItemId}`;

    // 2. Make the PUT request
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // 3. Send the new data as a JSON string
      body: JSON.stringify({
        deliveryOptionId: newDeliveryOptionId,
      }),
    });

    // 4. Check if the update was successful
    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - Failed to update delivery option`
      );
    }

    const updatedData = await response.json();
    console.log("Success! Cart item updated:", updatedData);
    getCartBackend();

    return updatedData;
  } catch (error) {
    console.error("Failed to send PUT request:", error);
  }
}


export interface CartItem {
  productId: string,
  productQuantity: number,
  deliveryOptionId: string,
  readonly id: string 
}

function saveToStorage(cart: CartItem[]): void{
  localStorage.setItem('kamnaCart', JSON.stringify(cart));
}

// update the quantity of the cart
export function updateCartQuantity(cart: CartItem[]): number {

  let cartQuantity = 0;

  cart.forEach(cartItem => {

    cartQuantity += cartItem.productQuantity;

  }); 

  return cartQuantity;
}


export async function updateRemoteDeliveryOption(
  cartItemId: string, 
  newDeliveryOptionId: string
): Promise<CartItem | undefined>{
  const url = `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItemId}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        deliveryOptionId: newDeliveryOptionId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update delivery option. Status: ${response.status}`);
    }

    const updatedItem: CartItem = await response.json();
    console.log('Successfully updated delivery option on server:', updatedItem);
    return updatedItem;

  } catch (error) {
    console.error('Error executing PUT request to MockAPI:', error);
    return undefined;
  }
}

export async function deleteRemoteCartItem(cartItemId: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/${cartItemId}`, {
      method: 'DELETE',
    });

    return response.ok; 
  } catch (error) {
    console.error("Error communicating with backend during delete:", error);
    return false;
  }
}