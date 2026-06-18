import { CartSummary, EmptyCart } from "./OrderSummary"
// import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import { PaymentSummary } from "./PaymentSummary";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";


interface CheckoutPageProps {
  cart: CartItem[],
  products: Product[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >
}
export function CheckoutPage({cart, products, setCart}: CheckoutPageProps){

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
              Checkout(0 items)
            </h2>
          </div>
        </div>
      </header>

      <main>
        {/* {isLoading && <SkeletonLoad />} */}

        {
          cart.length 
          ? <section className="checkout-grid js-checkout-grid">
              <CartSummary cart={cart} products={products} setCart={setCart} />
              <PaymentSummary />
            </section>  
          : <EmptyCart /> 
        }

      </main>
    </>
  )
}