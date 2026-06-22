import { CartSummary, EmptyCart } from "./OrderSummary"
// import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import { PaymentSummary } from "./PaymentSummary";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";
import type { DeliveryOptions } from "../../types/cart";
import './CheckoutPage.css';

interface CheckoutPageProps {
  cart: CartItem[],
  products: Product[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >,
  deliveryOptions: DeliveryOptions[]
}
export function CheckoutPage({cart, products, setCart, deliveryOptions}: CheckoutPageProps){

  const cartQuantity = cart.reduce(
    (sum, item) => sum + item.productQuantity,
    0
  );

  return (

    <>
      <title> Checkout Page</title>

      <header className="checkout-header">
        <div className="header-content">
            <div className="brand-section">
              <Link to="/">
                <img src="/brand-icon.jpg" alt="Kaamna Icon" className="brand-icon" loading="lazy" />
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
              <CartSummary cart={cart} products={products} setCart={setCart} deliveryOptions={deliveryOptions} />
              <PaymentSummary cartQuantity={cartQuantity} cart={cart} products={products} deliveryOptions={deliveryOptions} setCart={setCart} />
            </section>  
          : <EmptyCart /> 
        }

      </main>
    </>
  )
}