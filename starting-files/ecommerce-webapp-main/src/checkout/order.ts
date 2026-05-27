import { CartItem, updateCartItemQuantity } from "../data/cart";
import { DeliveryOption, getDeliveryOptions } from "../data/delivery-options";
import {
  updateRemoteDeliveryOption,
  getCartBackend,
  deleteRemoteCartItem,
} from "../data/cart";
import { Product } from "../homepage";
import dayjs from "dayjs";
import formatCurrency from "../utility/format-currency";
import { renderPaymentSummaryHtml } from "./payment";
import { renderUpdateCartQuantity } from "../checkout";

export function renderCartSummary(
  deliveryOptions: DeliveryOption[],
  cart: CartItem[],
  products: Product[]
) {
  console.log(deliveryOptions);
  const ordersHtml = cart
    .map((cartItem) => {
      const { productId, deliveryOptionId } = cartItem;
      console.log(deliveryOptionId);

      // normalization for products

      const matchingProduct: Product | undefined = products.find(
        (product) => product.id === productId
      );

      console.log(matchingProduct);

      // normalization of delivery options;
      const matchingOption: DeliveryOption | undefined = deliveryOptions.find(
        (option) => option.id === deliveryOptionId
      );

      if (matchingOption && matchingProduct) {
        console.log(matchingOption);

        console.log(matchingOption);
        // delivery date
        const todayDate = dayjs();
        console.log(todayDate);

        const deliveryDate = todayDate.add(matchingOption.deliveryDays, "days");

        const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

        console.log(deliveryDateFormatted);
        let orderHtml = `
        <div class="cart-item-container" data-cart-item-id="${cartItem.id}">
          <div class="delivery-date">Delivery date: ${deliveryDateFormatted}</div>
  
          <div class="cart-item-details-grid">
            <img src="${matchingProduct.image}" class="product-image" />
  
            <div class="product-info">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">₹${formatCurrency(
                matchingProduct.pricePaisa
              )}</div>
              <div class="product-quantity js-product-quantity-${productId}">
                Quantity: ${cartItem.productQuantity} 
                <span class="link-primary js-update-link" data-product-id="${productId}">Update</span>

                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value="${cartItem.productQuantity}" 
                  class="js-quantity-input hidden" 
                  style="width: 45px; padding: 2px;" 
                />
                <span class="link-primary js-save-link hidden" style="margin-left: 5px;">Save</span>

                <span class="link-primary js-delete-link" data-product-id="${productId}">Delete</span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="option-title">Choose a delivery option:</div>
              <div class="delivery-options">
                ${
                  renderDeliveryOptions(productId, cartItem).deliveryOptionsHtml
                }
              </div>
            </div>
          </div>
        </div>
      `;

        return orderHtml;
      }
    })
    .join("");

  // console.log(ordersHtml);

  function renderDeliveryOptions(productId: string, cartItem: CartItem) {
    let deliveryDateFormatted: string | undefined;
    const deliveryOptionsHtml = deliveryOptions
      .map((deliveryOption) => {
        // delivery date
        const todayDate = dayjs();
        const deliveryDate = todayDate.add(deliveryOption.deliveryDays, "days");
        deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

        // checked delivery option
        const isChecked =
          deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";
        let cost = deliveryOption.shippingCost;
        let deliveryOptionHtml = `
        <div class="delivery-option js-delivery-option" data-delivery-option-id="${
          deliveryOption.id
        }">
          <input type="radio" ${isChecked} name="delivery-${productId}" />
          <div class="js-delivery-info">
            <span class="date">
              ${deliveryDateFormatted}
            </span><br />${cost ? `₹${formatCurrency(cost)}` : `FREE SHIPPING`}
          </div>
        </div>
      `;

        return deliveryOptionHtml;
      })
      .join("");

    return { deliveryOptionsHtml, deliveryDateFormatted };
  }

  // rendered cartitems on the page

  const orderRowEl = document.querySelector(".js-order-review") as HTMLElement;
  orderRowEl.innerHTML = ordersHtml;
}

const orderRowEl = document.querySelector(".js-order-review") as HTMLElement;

orderRowEl?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  const masterBox = target.closest(".cart-item-container") as HTMLElement | null;
  if (!masterBox) return;

  const { cartItemId } = masterBox.dataset as { cartItemId: string };

  const clickedDelete = target.closest(".js-delete-link") as HTMLSpanElement | null;
  if (clickedDelete) {
    clickedDelete.textContent = "Deleting...";
    clickedDelete.style.pointerEvents = "none";

    const serverDeleteSuccessful = await deleteRemoteCartItem(cartItemId);

    if (serverDeleteSuccessful) {
      console.log(`Successfully removed item ${cartItemId} from server!`);
      masterBox.remove();

      try {
        const [freshCart, freshOptions] = await Promise.all([
          getCartBackend(),
          getDeliveryOptions(),
        ]);

        const productsData = localStorage.getItem("kamnaProducts") || "[]";
        const products: Product[] = JSON.parse(productsData);

        if (freshOptions && freshCart && products) {

          renderPaymentSummaryHtml(freshOptions, freshCart, products);
          console.log("Payment summary successfully updated!");

          renderCartSummary(freshOptions, freshCart, products);
          console.log("Cart summary successfully updated!");

          renderUpdateCartQuantity(freshCart);
          
          if(!freshCart.length){
            const checkoutEmptyEl = document.querySelector('.js-cart-empty') as HTMLElement;

            checkoutEmptyEl.classList.remove('hidden');
            console.log('cart is zero');
          }else{
            const checkoutGridEl = document.querySelector('.js-checkout-grid') as HTMLElement;

            checkoutGridEl.classList.remove('hidden');
          }
        }
      } catch (refreshError) {
        console.error("Failed to fetch fresh data after deleting item:", refreshError);
      }
    } else {
      alert("Uh oh! Could not delete the item from the server. Try again.");
      clickedDelete.textContent = "Delete";
      clickedDelete.style.pointerEvents = "auto";
    }
    return;
  }

  const clickedUpdate = target.closest(".js-update-link");
  if (clickedUpdate) {
    const updateLink = masterBox.querySelector(".js-update-link") as HTMLSpanElement;
    const saveLink = masterBox.querySelector(".js-save-link") as HTMLSpanElement;
    const quantityInput = masterBox.querySelector(".js-quantity-input") as HTMLInputElement;
    const quantityLabel = masterBox.querySelector(".js-quantity-label") as HTMLElement;

    console.log(quantityInput);
    console.log(saveLink);
    updateLink.classList.toggle('hidden');

    quantityInput.classList.toggle('hidden');
    saveLink.classList.toggle('hidden');

    console.log(quantityInput);
    console.log(saveLink);
    quantityInput.focus();
    return; 
  }

  const clickedSave = target.closest(".js-save-link") as HTMLSpanElement | null;

  if (clickedSave) {
    const saveLink = masterBox.querySelector(".js-save-link") as HTMLElement;
    const quantityInput = masterBox.querySelector(".js-quantity-input") as HTMLInputElement;

    const newQuantity = parseInt(quantityInput.value, 10);

    if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 10) {
      alert("Please enter a valid quantity between 1 and 10.");
      return;
    }

    saveLink.textContent = "Saving...";
    saveLink.style.pointerEvents = "none";

    try {
     
      await updateCartItemQuantity(newQuantity, { id: cartItemId } as CartItem);
      console.log("Server quantity successfully updated using your function!");
      
      const [freshCart, freshOptions] = await Promise.all([
        getCartBackend(),
        getDeliveryOptions(),
      ]);

      const productsData = localStorage.getItem("kamnaProducts") || "[]";
      const products: Product[] = JSON.parse(productsData);

      if (freshOptions && freshCart && products) {
        renderPaymentSummaryHtml(freshOptions, freshCart, products);
        renderCartSummary(freshOptions, freshCart, products);
        renderUpdateCartQuantity(freshCart);

        if(!freshCart.length){
          const checkoutEmptyEl = document.querySelector('.js-cart-empty') as HTMLElement;

          checkoutEmptyEl.classList.remove('hidden');
          console.log('cart is zero');
        }else{
          const checkoutGridEl = document.querySelector('.js-checkout-grid') as HTMLElement;

          checkoutGridEl.classList.remove('hidden');
        }

      }
    } catch (error) {
      console.error("Network error while saving quantity:", error);
      saveLink.textContent = "Save";
      saveLink.style.pointerEvents = "auto";
    }
    return; 
  }

  const clickedShippingCard = target.closest(".js-delivery-option") as HTMLElement | null;
  if (clickedShippingCard) {
    const deliveryOptionId = clickedShippingCard.dataset.deliveryOptionId;
    if (cartItemId && deliveryOptionId) {
      console.log("Gotcha! Securely pulled dataset from the parent container.");
      console.log("Cart Item ID:", cartItemId);
      console.log("Delivery Option ID:", deliveryOptionId);

      try {
        const updatedItem = await updateRemoteDeliveryOption(cartItemId, deliveryOptionId);
        console.log(updatedItem);

        const [freshCart, freshOptions] = await Promise.all([
          getCartBackend(),
          getDeliveryOptions(),
        ]);

        const productsData = localStorage.getItem("kamnaProducts") || "[]";
        const products: Product[] = JSON.parse(productsData);

        console.log("Fetched fresh data concurrently:", { freshCart, freshOptions });

        if (freshOptions && freshCart && products) {
          renderPaymentSummaryHtml(freshOptions, freshCart, products);
          console.log("Payment summary successfully updated!");
          renderCartSummary(freshOptions, freshCart, products);
          console.log("Cart summary successfully updated!");

          if(!freshCart.length){
            const checkoutEmptyEl = document.querySelector('.js-cart-empty') as HTMLElement;

            checkoutEmptyEl.classList.remove('hidden');
            console.log('cart is zero');
          }else{
            const checkoutGridEl = document.querySelector('.js-checkout-grid') as HTMLElement;

            checkoutGridEl.classList.remove('hidden');
          }

        }
      } catch (error) {
        console.error("One of the API calls failed:", error);
      }
    }
    return;
  }
});
