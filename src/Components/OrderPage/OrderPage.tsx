import { Link } from "react-router-dom";
// import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import "./OrderPage.css";

export function OrderProducts() {
  return (
    <div className="order">
      <div className="product-info">
        <img
          src="/products/athletic-cotton-socks-6-pairs.jpg"
          alt="Nordic Mug Set"
          className="product-thumb"
        />
        <div className="product-details">
          <h3>Black and Gray Athletic Cotton Socks - 6 Pairs</h3>
          <p className="status">
            Arriving on: <span className="arrival-date">March 31</span>
          </p>
          <p className="qty">Quantity: 1</p>
        </div>
      </div>
      <div className="product-actions">
        <Link
          className="btn btn-primary"
          to="/tracking-page?orderId=123&productId=456"
        >
          Track package
        </Link>
      </div>
    </div>
  );
}

function Order() {
  return (
    <article className="order-card">
      <header className="order-card-header">
        <div className="meta-item">
          <span className="label">Order Placed:</span>
          <span className="value">Wednesday, June 20</span>
        </div>
        <div className="meta-item">
          <span className="label">Total:</span>
          <span className="value">Rs 2000</span>
        </div>
        <div className="meta-item order-id-group">
          <span className="label">Order ID:</span>
          <span className="value">18</span>
        </div>
      </header>

      <div className="order-body">
        <OrderProducts />
      </div>

      <footer className="order-footer">
        <p className="brand-message">
          Mubarak ho, apka ek aur naye bandhan finalized!
        </p>
      </footer>
    </article>
  );
}

export function OrderPage() {
  return (
    <>
      <header className="kaamna-header">
        <div className="header-container">
          <div className="brand-identity">
            <Link to="/">
              <img src="/brand-icon.jpg" alt="Kaamna" className="logo" />
            </Link>
          </div>
          <div className="page-title">
            <h2>Your Orders</h2>
          </div>
        </div>
      </header>

      <main className="container">
        {/* <SkeletonLoad /> */}

        <section className="orders-list js-order-list">
          <Order />
        </section>
      </main>
    </>
  );
}
