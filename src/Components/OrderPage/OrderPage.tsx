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
      <div className="order-product-info">
        <img
          src={product.image}
          className="order-product-thumb"
        />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p className="order-status">
            Arriving on: <span className="arrival-date">{dateFormatted}</span>
          </p>
          <p className="order-qty">Quantity: {item.productQuantity}</p>
        </div>
      </div>
      <div className="product-actions">
        <Link
          className="order-btn order-btn-primary"
          to={`/tracking?itemQuantity=${item.productQuantity}&&dateFormatted=${dateFormatted}&&productName=${product.name}&&productImage=${product.image}`}
        >
          Track package
        </Link>
      </div>
    </div>
  );
}

interface OrderProps {
  latestOrder: Order,
  products: Product[],
  deliveryOptions: DeliveryOptions[]
}

function Order({latestOrder, products, deliveryOptions}: OrderProps) {

  const orderDate = dayjs(latestOrder.orderTime).format("dddd, MMMM D");

  return (
    <article className="order-card">
      <header className="order-card-header">
        <div className="meta-item">
          <span className="order-label">Order Placed:</span>
          <span className="order-value">{orderDate}</span>
        </div>
        <div className="meta-item">
          <span className="order-label">Total:</span>
          <span className="order-value">Rs {formatCurrency(latestOrder.totalPrice)}</span>
        </div>
        <div className="meta-item order-id-group">
          <span className="order-label">Order ID:</span>
          <span className="order-value">{latestOrder.orderId}</span>
        </div>
      </header>

      <div className="order-body">
        {latestOrder.products.map((item) => {

          const product = products.find((product) => {
            return item.productId === product.id
          })

          if(!product){return}

          const option = deliveryOptions.find((option) => {
            return item.deliveryOptionId === option.id
          })

          if(!option){return}

          return <OrderProducts key={item.productId} item={item} product={product} option={option} orderTime={latestOrder.orderTime}/>
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
  const latestOrders = [...orders].reverse();

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
      <header className="order-header">
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

      <main className="order-container">
        {isLoading && <SkeletonLoad />}

        <section className="orders-list js-order-list">
          {latestOrders.map((latestOrder) => {
            return <Order key={latestOrder.orderId} latestOrder={latestOrder} products={products} deliveryOptions={deliveryOptions} />
          })}
        </section>
      </main>
    </>
  );
}
