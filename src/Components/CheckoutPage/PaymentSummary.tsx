import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";
import type { DeliveryOptions } from "../../types/cart";
import formatCurrency from "../../utility/formatCurrency";

interface PaymentSummaryProps {
  cartQuantity: number,
  cart: CartItem[],
  products: Product[],
  deliveryOptionsData: DeliveryOptions[]
}

export function PaymentSummary({ cartQuantity, cart, products, deliveryOptionsData }: PaymentSummaryProps) {

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

  return (
    <section className="payment-summary js-payment-summary">
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

        <button className="kaamna-btn js-kaamna-btn">
          FULFILL YOUR DESIRES
        </button>
      </div>
    </section>
  );
}
