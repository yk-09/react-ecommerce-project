import { CartSummary, EmptyCart } from "./OrderSummary"
import { useState, useEffect } from "react";
import axios from "axios";
import type { CartItem } from "../../types/cart";
import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage(){

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    async function fetchCart(){
      try{

        const res =  await axios.get<CartItem[]>(
          'https://69d1185f90cd06523d5dd7c7.mockapi.io/cart'
        );

        const data = res.data;
        setCart(data);

      }catch(error){
        console.error(error);
      }finally{
        console.log('done');
        setIsLoading(false);
      }
    }

    fetchCart();
  }, []);

  return (

    <>
      <title> Checkout Page</title>

      <header className="kaamna-header">
        <div className="header-content">
            <div className="brand-section">
              <a href="index.html">
                <img src="/brand-icon.jpg" alt="Kaamna Icon" className="brand-icon" />
              </a>
            </div>
          <div className="checkout-status js-checkout-status">
            <h2 className="js-checkout-quantity">
              Checkout(0 items)
            </h2>
          </div>
        </div>
      </header>

      <main>
        {isLoading && <SkeletonLoad />}

        {
          cart.length 
          ? <section className="checkout-grid js-checkout-grid">
            <CartSummary cart={cart} />
            <PaymentSummary />
          </section>  
          : <EmptyCart /> 
        }

      </main>
    </>
  )
}