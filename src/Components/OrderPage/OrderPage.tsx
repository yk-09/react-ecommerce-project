import { Link } from "react-router-dom";
import SkeletonLoad from "../SkeletonLoad/SkeletonLoad";
import "./OrderPage.css";
import type { Order } from "../../types/order";
import { useState, useEffect } from "react";
import { getOrders } from "../../services/orderApi";
import type { CartItem, DeliveryOptions } from "../../types/cart";
import formatCurrency from "../../utility/formatCurrency";
import type { Product } from "../../types/product";
import dayjs from "dayjs";

interface OrderProductsProps {
  item: CartItem,
  product: Product,
  option: DeliveryOptions,
  orderTime: string
}

export function OrderProducts({item, product, option, orderTime}: OrderProductsProps) {


  const arrivalDate = dayjs(orderTime).add(option.deliveryDays, 'days');

  const dateFormatted = arrivalDate.format('dddd, MMMM D');

  return (
    <div className="order">
      <div className="product-info">
        <img
          src={product.image}
          className="product-thumb"
        />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p className="status">
            Arriving on: <span className="arrival-date">{dateFormatted}</span>
          </p>
          <p className="qty">Quantity: {item.productQuantity}</p>
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

interface OrderProps {
  order: Order,
  products: Product[],
  deliveryOptions: DeliveryOptions[]
}

function Order({order, products, deliveryOptions}: OrderProps) {

  const orderDate = dayjs(order.orderTime).format("dddd, MMMM D");

  return (
    <article className="order-card">
      <header className="order-card-header">
        <div className="meta-item">
          <span className="label">Order Placed:</span>
          <span className="value">{orderDate}</span>
        </div>
        <div className="meta-item">
          <span className="label">Total:</span>
          <span className="value">Rs {formatCurrency(order.totalPrice)}</span>
        </div>
        <div className="meta-item order-id-group">
          <span className="label">Order ID:</span>
          <span className="value">{order.orderId}</span>
        </div>
      </header>

      <div className="order-body">
        {order.products.map((item) => {

          const product = products.find((product) => {
            return item.productId === product.id
          })

          if(!product){return}

          const option = deliveryOptions.find((option) => {
            return item.deliveryOptionId === option.id
          })

          if(!option){return}

          return <OrderProducts key={item.productId} item={item} product={product} option={option} orderTime={order.orderTime}/>
        })}
      </div>

      <footer className="order-footer">
        <p className="brand-message">
          Mubarak ho, apka ek aur naye bandhan finalized!
        </p>
      </footer>
    </article>
  );
}

interface OrderPageProps {
  products: Product[],
  deliveryOptions: DeliveryOptions[]
}

export function OrderPage({products, deliveryOptions}: OrderPageProps) {

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const orders = await getOrders();
        setOrders(orders);
        console.log(orders);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

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
        {isLoading && <SkeletonLoad />}

        <section className="orders-list js-order-list">
          {orders.map((order) => {
            return <Order key={order.orderId} order={order} products={products} deliveryOptions={deliveryOptions} />
          })}
        </section>
      </main>
    </>
  );
}
