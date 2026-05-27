import dayjs from "dayjs";
import { CartItem } from "./cart";

export interface Order {
  orderId: string,
  orderTime: dayjs.Dayjs,
  products: CartItem[],
  totalPrice: number
}

type RenderOrderHtml = (orders: Order[]) => void

export async function getOrderData(renderOrderHtml: RenderOrderHtml){
  const url = 'https://69ada80eb50a169ec87fef13.mockapi.io/orders';
  const orderListEl = document.querySelector('.js-order-list') as HTMLElement;

  try{
    console.log(orderListEl);
    console.log('Getting orders from backend');

    if(orderListEl){
      orderListEl.classList.add('hidden');
      console.log('list is hidden');
    }

    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Order[] = await response.json();
    console.log(data);
    const orders = data.toReversed();
    renderOrderHtml(orders);
    localStorage.setItem('kamnaOrders', JSON.stringify(orders));
  }
  catch(error){
    console.error(`Couldn't create order ${error}`);
  } 
  finally {
    const homepageSkeletonEle = document.querySelector('.js-loading-homepage') as HTMLElement;

    if(orderListEl && homepageSkeletonEle){
      orderListEl.classList.remove('hidden');
      homepageSkeletonEle.classList.add('hidden');
    }
  }
}

export async function createOrder(grandTotal: number) {
  const cartData = localStorage.getItem('kamnaCart') || '[]';
  const cart: CartItem[] | [] = JSON.parse(cartData);
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const orderData: Order = {
    orderId: crypto.randomUUID(),
    orderTime: dayjs(),
    products: cart,
    totalPrice: grandTotal,
  };

  try {
    console.log("confirming your order");
    const response = await fetch(
      "https://69ada80eb50a169ec87fef13.mockapi.io/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw "error";
    }

    const cartResponse = await fetch(
      'https://69d1185f90cd06523d5dd7c7.mockapi.io/cart'
    );

    const backendCart = await cartResponse.json();



    // STEP 3: delete all cart items
    await Promise.all(

      backendCart.map((cartItem: any) => {

        return fetch(
          `https://69d1185f90cd06523d5dd7c7.mockapi.io/cart/${cartItem.id}`,
          {
            method: 'DELETE',
          }
        );

      })

    );
    localStorage.removeItem('kamnaCart');
    // console.log(order);
  } catch (error) {
    console.log(error);
  } finally {
    window.location.href = "orders.html";
  }
}
