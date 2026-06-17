/*
  1. order summary section
  2. cartitem card 
  3. deliveryoption card 
  4. delivery option 
*/

import axios from "axios"
import { useState, useEffect } from "react"
import type { CartItem, DeliveryOptions } from "../../types/cart";
import './CheckoutPage.css';
import './EmptyCart.css';

interface DeliveryOptionProps {
  option: DeliveryOptions
}

function DeliveryOption({option}: DeliveryOptionProps){
  return (
    <div className="delivery-option">
      <input type="radio" checked name="delivery-${productId}" />
      <div className="js-delivery-info">
        <span className="date">
          Wendesday, June 24
        </span><br /> {option.shippingCost ? `9000`: `Free Shipping`}
      </div>
    </div>
  )
}

export function OptionCard(){

  const [deliveryOptionsData, setDeliveryOptionsData] = useState<DeliveryOptions[]>([]);
  
  useEffect(() => {
    async function fetchOptions(){
      try{

        const res =  await axios.get<DeliveryOptions[]>(
          'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options'
        );

        const data = res.data;
        setDeliveryOptionsData(data);

      }catch(error){
        console.error(error);
      }finally{
        console.log('done');
      }
    }

    fetchOptions();
  }, []);

  return (
    <div className="delivery-options">
      <div className="option-title">Choose a delivery option:</div>
      <div className="delivery-options">
        {deliveryOptionsData.map((option) => {
          return <DeliveryOption option={option} />
        })}
      </div>
    </div>
  )
}

interface CartItemCardProps {
  item: CartItem
}

function CartItemCard ({item}: CartItemCardProps) {

  return (
    <div className="cart-item-container" data-cart-item-id="${cartItem.id}">
      <div className="delivery-date">Delivery date: Wednesday, June 20</div>
      <div className="cart-item-details-grid">
        <img src="/products/athletic-cotton-socks-6-pairs.jpg" className="product-image" />

        <div className="product-info">
          <div className="product-name">Black and Gray Athletic Cotton Socks - 6 Pairs</div>
          <div className="product-price">₹499.00</div>
          <div className="product-quantity js-product-quantity-${productId}">
            Quantity: {item.productQuantity} 
            <span className="link-primary js-update-link" data-product-id="${productId}">Update</span>

            <input 
              type="number" 
              min="1" 
              max="10" 
              value="${cartItem.productQuantity}" 
              className="js-quantity-input hidden" 
              style={{width: '45px', padding: '2px'}}
            />
            <span className="link-primary js-save-link hidden" style={{marginLeft: '5px'}}>
              Save
            </span>

            <span className="link-primary js-delete-link" data-product-id="${productId}">Delete</span>
          </div>
        </div>

        <OptionCard />
      </div>
    </div>  
  )
}

interface CartSummaryProps {
  cart: CartItem[]
}

export function CartSummary ({cart}: CartSummaryProps) {

  return (
    <div className="order-review js-order-review">
      <h2>Review your attachments</h2>
      {cart.map((item) => {
        return <CartItemCard item={item} />
      })}
    </div>
  )
}

export function EmptyCart(){
  return (
    <section className="main-content js-cart-empty">
      <div className="empty-cart-card">
        
        <div className="illustration-container">
          <svg className="large-cart-svg" viewBox="0 0 24 24" fill="none" stroke="#1a3a2a" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>

        <h2 className="alert-headline">Aapki cart khaali hai. Bilkul aapki tarah.</h2>
        <p className="alert-subline">Kuch bhar lo?</p>

        <a href="index.html" className="explore-btn">Explore Attachments</a>
        
      </div>
    </section>
  )
}