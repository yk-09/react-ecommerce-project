import { products } from "./data/products";
import { Order } from "./data/orders-data";
import { Product } from "./homepage";
import { DeliveryOption } from "./data/delivery-options";
import { getOrderData } from "./data/orders-data";
import dayjs from "dayjs";

getOrderData(renderOrderHtml);

console.log(localStorage.getItem('kamnaProducts'));
console.log(localStorage.getItem('kaamnaOptions'));

const productsData = localStorage.getItem('kamnaProducts') || '[]';
const storedProducts: Product[] = JSON.parse(productsData);

const optionsData = localStorage.getItem('kaamnaOptions') || '[]';
const deliveryOptions: DeliveryOption[] = JSON.parse(optionsData);

function renderOrderHtml(orders: Order[]): void {
  const ordersHtml = orders.map((order) => {

    const orderDateStr = order.orderTime;
    const orderDate = dayjs(orderDateStr);
    const orderDateFormatted = orderDate.format('dddd, MMMM D');
    const orderHtml = 
    `
      <article class="order-card">
        <header class="order-card-header">
          <div class="meta-item">
            <span class="label">Order Placed:</span>
            <span class="value">${orderDateFormatted}</span>
          </div>
          <div class="meta-item">
            <span class="label">Total:</span>
            <span class="value">Rs ${(order.totalPrice / 100).toFixed(2)}</span>
          </div>
          <div class="meta-item order-id-group">
            <span class="label">Order ID:</span>
            <span class="value">${order.orderId}</span>
          </div>
        </header>

        <div class="order-body">
          ${renderOrderProducts(order)}
        </div>

        <footer class="order-footer">
          <p class="brand-message">
            Mubarak ho, apka ek aur naye bandhan finalized!
          </p>
        </footer>
      </article>
    `
    return orderHtml;
  }).join('');

  console.log(ordersHtml);

  const orderListEl = document.querySelector('.js-order-list') as HTMLElement; 

  if(orderListEl){
    orderListEl.innerHTML = ordersHtml;
  };
}

function renderOrderProducts(order: Order): string{

  const productsHtml = order.products.map((orderItem) => {

    // normalization for product
    const matchingProduct = storedProducts.find(
      product => orderItem.productId === product.id
    );

    if (!matchingProduct) {
      console.error("Product not found:", orderItem.productId);
      return;
    }

    // normalization for deliveryoptions
    const matchingOption = deliveryOptions.find(
      option => orderItem.deliveryOptionId === option.id
    );

    if (!matchingOption) {
      console.error("Options not found:", orderItem.productId);
      return;
    };

    const productHtml = `
      <div class="order">
        <div class="product-info">
          <img src=${matchingProduct.image} alt="Nordic Mug Set" class="product-thumb" />
          <div class="product-details">
            <h3>${matchingProduct.name}</h3>
            <p class="status">
              Arriving on: <span class="arrival-date">March 31</span>
            </p>
            <p class="qty">Quantity: ${orderItem.productQuantity}</p>
          </div>
        </div>
        <div class="product-actions">
          <a class="btn btn-primary" href="tracking-page.html?orderId=${order.orderId}&productId=${orderItem.productId}">
            Track package
          </a>
        </div>
      </div>
    `

    return productHtml;
  }).join('');

  return productsHtml;
}