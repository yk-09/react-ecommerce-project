import { CartSummary, EmptyCart } from "./OrderSummary"
// import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import { PaymentSummary } from "./PaymentSummary";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";
import type { DeliveryOptions } from "../../types/cart";
import { useState, useEffect } from "react";
import axios from "axios";

interface CheckoutPageProps {
  cart: CartItem[],
  products: Product[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >
}
export function CheckoutPage({cart, products, setCart}: CheckoutPageProps){

  const cartQuantity = cart.reduce(
    (sum, item) => sum + item.productQuantity,
    0
  );

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

    <>
      <title> Checkout Page</title>

      <header className="kaamna-header">
        <div className="header-content">
            <div className="brand-section">
              <Link to="/">
                <img src="/brand-icon.jpg" alt="Kaamna Icon" className="brand-icon" />
              </Link>
            </div>
          <div className="checkout-status js-checkout-status">
            <h2 className="js-checkout-quantity">
              Checkout({cartQuantity} items)
            </h2>
          </div>
        </div>
      </header>

      <main>
        {/* {isLoading && <SkeletonLoad />} */}

        {
          cart.length 
          ? <section className="checkout-grid js-checkout-grid">
              <CartSummary cart={cart} products={products} setCart={setCart} deliveryOptionsData={deliveryOptionsData} />
              <PaymentSummary cartQuantity={cartQuantity} cart={cart} products={products} deliveryOptionsData={deliveryOptionsData} />
            </section>  
          : <EmptyCart /> 
        }

      </main>
    </>
  )
}