import './TrackingPage.css';
import { Link, useSearchParams } from 'react-router-dom';

export function TrackingPage() {

  const [searchParams] = useSearchParams();

  const itemQuantity = searchParams.get("item") ?? "";
  const dateFormatted =
    searchParams.get("dateFormatted") ?? "";
  const productName =
    searchParams.get("productName") ?? "";
  const productImage =
    searchParams.get("productImage") ?? "";
  
  return (

    <main className="page-content">
      <Link to="/orders" className="all-orders-link">View all orders</Link>

      <section className="order-details">
        <h1 className="delivery-headline">Arriving on: {dateFormatted}</h1>
        <p className="product-title">{productName}</p>
        <p className="product-quantity">Quantity: {itemQuantity}</p>
        <figure className="image-box">
          <img
            src={productImage}
          />
        </figure>
      </section>

      <section className="tracking-section">
        <div className="status-labels-container">
          <span className="status-label text-left active-text">Preparing</span>
          <span className="status-label text-center">Shipped</span>
          <span className="status-label text-right">Delivered</span>
        </div>

        <div className="progress-bar-outline">
          <div className="progress-bar-fill-green"></div>
        </div>
      </section>
    </main>
  )
}
