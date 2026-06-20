/*
  1. order summary section
  2. cartitem card 
  3. deliveryoption card 
  4. delivery option 
*/
import { useState } from "react"
import type { CartItem, DeliveryOptions } from "../../types/cart";
import './CheckoutPage.css';
import './EmptyCart.css';
import type { Product } from "../../types/product";
import formatCurrency from "../../utility/formatCurrency";
import { updateDeliveryOption } from "../../services/deliveryOptionApi";
import { updateCartItemQuantity, deleteCartItem } from "../../services/cartApi";
import { Link } from "react-router-dom";

interface DeliveryOptionProps {
  option: DeliveryOptions,
  item: CartItem,
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >
}

function DeliveryOption({option, item, setCart}: DeliveryOptionProps){

  const isChecked = item.deliveryOptionId === option.id ? true : false;

  async function handleClick() {
    try {
      const updatedCartItem =
        await updateDeliveryOption(
          item,
          option.id
        );

      setCart(prev =>
        prev.map(cartItem =>
          cartItem.id === updatedCartItem.id
            ? updatedCartItem
            : cartItem
        )
      );

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="delivery-option" onClick={handleClick}>
      <input type="radio" checked={isChecked} name={`delivery-option-${item.productId}`} />
      <div className="js-delivery-info">
        <span className="date">
          Wendesday, June 24
        </span><br /> {option.shippingCost ? `₹${formatCurrency(option.shippingCost)}` : `Free Shipping`}
      </div>
    </div>
  )
}

interface OptionCardProps {
  item: CartItem,
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >,
  deliveryOptionsData: DeliveryOptions[]
}

export function OptionCard({item, setCart, deliveryOptionsData}: OptionCardProps){

  return (
    <div className="delivery-options">
      <div className="option-title">Choose a delivery option:</div>
      <div className="delivery-options">
        {deliveryOptionsData.map((option) => {
          return <DeliveryOption option={option} item={item} setCart={setCart} />
        })}
      </div>
    </div>
  )
}

interface CartItemCardProps {
  item: CartItem,
  products: Product[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >,
  deliveryOptionsData: DeliveryOptions[]
}

function CartItemCard ({item, products, setCart, deliveryOptionsData}: CartItemCardProps) {

  const [updateRequired, setUpdateRequired] = useState(false);

  const [quantity, setQuantity] = useState(item.productQuantity);

  const product = products.find(
    (product) => product.id === item.productId
  );

  if (!product) {
    return null;
  }

  async function handleSave() {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      alert("Quantity must be an integer between 1 and 10");
      return;
    }

    try {
      const updatedCartItem =
        await updateCartItemQuantity(
          item,
          quantity
        );

      setCart(prev =>
        prev.map(cartItem =>
          cartItem.id === updatedCartItem.id
            ? updatedCartItem
            : cartItem
        )
      );

      setUpdateRequired(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      await deleteCartItem(item.id);

      setCart(prev =>
        prev.filter(
          cartItem => cartItem.id !== item.id
        )
      );

    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div className="cart-item-container">
      <div className="delivery-date">Delivery date: Wednesday, June 20</div>
      <div className="cart-item-details-grid">
        <img src={product.image} width={100}  />

        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-price">₹{formatCurrency(product.pricePaisa)}</div>
          <div className="product-quantity js-product-quantity-${productId}">
            Quantity: {item.productQuantity} 


            {!updateRequired && <span className="link-primary js-update-link" style={{marginLeft: '10px'}} onClick={() => {setUpdateRequired(true)}}>Update</span>}

            {
              updateRequired 
              && 
              <>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value="${cartItem.productQuantity}" 
                  style={{width: '50px', marginLeft: '10px', paddingLeft: '10px'}}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <span className="link-primary js-save-link" style={{marginLeft: '5px'}} onClick={handleSave}>
                  Save
                </span>
              </>
            }

            <span className="link-primary" onClick={handleDelete}>Delete</span>
          </div>
        </div>

        <OptionCard setCart={setCart} item={item} deliveryOptionsData={deliveryOptionsData} />
      </div>
    </div>  
  )
}

interface CartSummaryProps {
  cart: CartItem[],
  products: Product[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >,
  deliveryOptionsData: DeliveryOptions[]
}

export function CartSummary ({cart, products, setCart, deliveryOptionsData}: CartSummaryProps) {

  return (
    <div className="order-review js-order-review">
      <h2>Review your attachments</h2>
      {cart.map((item) => {
        return <CartItemCard products={products} item={item} setCart={setCart} deliveryOptionsData={deliveryOptionsData} />
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

        <Link to="/" className="explore-btn">Explore Attachments</Link>
        
      </div>
    </section>
  )
}