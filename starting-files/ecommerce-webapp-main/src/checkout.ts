import { getDeliveryOptions } from './data/delivery-options';
import { cart, CartItem, updateCartQuantity } from './data/cart';
import { products } from './data/products';
import { renderCartSummary } from './checkout/order';
import { renderPaymentSummaryHtml } from './checkout/payment';

export function renderUpdateCartQuantity(cart: CartItem[]){
  const cartQuantityEl = document.querySelector('.js-checkout-quantity') as HTMLHeadingElement;

  if(cartQuantityEl){
    cartQuantityEl.innerText = `Checkout(${updateCartQuantity(cart)} items)`;
  }
};

renderUpdateCartQuantity(cart);

getDeliveryOptions()
  .then((deliveryOptions) => {
    const checkoutEmptyEl = document.querySelector('.js-cart-empty') as HTMLElement;
    const checkoutGridEl = document.querySelector('.js-checkout-grid') as HTMLElement;

    if(cart.length && deliveryOptions){
      console.log('cart present');
      renderCartSummary(deliveryOptions, cart, products);
      renderPaymentSummaryHtml(deliveryOptions, cart, products);

      checkoutGridEl.classList.remove('hidden');
    }else{

      console.log('cart absent')
      checkoutEmptyEl.classList.remove('hidden');
    }
  });