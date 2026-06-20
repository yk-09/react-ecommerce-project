import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";
import type { DeliveryOptions } from "../../types/cart";
import formatCurrency from "../../utility/formatCurrency";
import { createOrder } from "../../services/orderApi";
import { deleteCartItem } from "../../services/cartApi";
import { useState } from "react";
import './loading.css';

interface PaymentSummaryProps {
  cartQuantity: number,
  cart: CartItem[],
  products: Product[],
  deliveryOptionsData: DeliveryOptions[],
  setCart: React.Dispatch<
    React.SetStateAction<CartItem[]>
  > 
}

export function PaymentSummary({ cartQuantity, cart, products, deliveryOptionsData, setCart }: PaymentSummaryProps) {

  const [loading, setLoading] = useState(false);

  let totalProductsCost = 0;
  let shippingCost = 0;

  cart.forEach(item => {
    const { productId, deliveryOptionId } = item;

    // normalization for products
    const matchingProduct: Product | undefined = products.find(
      (product) => product.id === productId
    );

    if(matchingProduct){
      totalProductsCost += matchingProduct.pricePaisa * item.productQuantity;
    }

    // normalization of delivery options
    const matchingOption: DeliveryOptions | undefined = deliveryOptionsData.find(
      (option) => option.id === deliveryOptionId
    );
    
    if(matchingOption){
      shippingCost += matchingOption.shippingCost;
    }

  });

  const totalBeforeTax = totalProductsCost + shippingCost;
  const extimatedTax = totalBeforeTax * 0.1;
  const grandTotal = totalBeforeTax + extimatedTax;

  async function handlePlaceOrder() {
  try {

    setLoading(true);

    await createOrder(cart, grandTotal);

    await Promise.all(
      cart.map((item) =>
        deleteCartItem(item.id)
      )
    );

    setCart([]);

  } catch (error) {
    console.error(error);
  }finally{
    setLoading(false);
  }
}

  return (
    <section className="payment-summary">
      <div className="payment-summary">
        <h3>The Cost of Desire</h3>
        <div className="summary-row">
          <span>Items ({cartQuantity}):</span> <span>₹{formatCurrency(totalProductsCost)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping & handling:</span> <span>₹{formatCurrency(shippingCost)}</span>
        </div>
        <div className="summary-row">
          <span>Total before tax:</span> <span>₹{formatCurrency(totalBeforeTax)}</span>
        </div>
        <div className="summary-row">
          <span>Estimated tax (10%):</span> <span>₹{formatCurrency(extimatedTax)}</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Order total:</span> <span>₹{formatCurrency(grandTotal)}</span>
        </div>

        <button className="kaamna-btn" onClick={handlePlaceOrder}>
          {loading && <span className="spinner"></span>}
          <span>FULFILL YOUR DESIRES</span>
        </button>
      </div>
    </section>
  );
}
