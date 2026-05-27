import dayjs from "dayjs";
import { DeliveryOption } from "./data/delivery-options";
import { Order } from "./data/orders-data";
import { Product } from "./homepage";

const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
const orderId = url.searchParams.get('orderId');

const ordersData = localStorage.getItem('kamnaOrders') || '[]';
const orders: Order[] = JSON.parse(ordersData); 

const freshProductsData = localStorage.getItem('kamnaProducts') || '[]';
const freshProducts: Product[] = JSON.parse(freshProductsData)

const optionData = localStorage.getItem('kaamnaOptions') || '[]'
const options: DeliveryOption[] = JSON.parse(optionData);

const matchingOrder = orders.find(order => order.orderId === orderId);
console.log(matchingOrder);

const matchingOrderItem = matchingOrder?.products.find(product => product.productId === productId);

const matchingOption = options.find(option => option.id === matchingOrderItem?.deliveryOptionId);
console.log(matchingOption);

const matchingProduct = freshProducts.find(product => product.id === productId);
console.log(matchingProduct);

let arrivalDateFormatted: string;
if(matchingOrder && matchingOption){
  const originalDateStr = matchingOrder.orderTime;
  const arrivalDate = dayjs(originalDateStr).add(matchingOption.deliveryDays, 'days') 
  arrivalDateFormatted = arrivalDate.format('dddd, MMMM D');

};

const orderDetailsEl = document.querySelector('.js-order-details') as HTMLElement;

console.log(productId);
console.log(orderId);
console.log(matchingOrderItem);

renderTrackedOrderHtml();

function renderTrackedOrderHtml(){
  if(!matchingProduct || !matchingOrder || !matchingOrderItem || !arrivalDateFormatted){
    return;
  }

  const orderDetailsHtml = `
    <section class="order-details">
      <h1 class="delivery-headline">Arriving on ${arrivalDateFormatted}</h1>
      <p class="product-title">${matchingProduct.name}</p>
      <p class="product-quantity">Quantity: ${matchingOrderItem.productQuantity}</p>
      <figure class="image-box">
        <img src=${matchingProduct.image} height="100" width="100">  
      </figure>
    </section>
  `

  if(orderDetailsEl){
    orderDetailsEl.innerHTML = orderDetailsHtml;
  }
}