export interface DeliveryOption {
  readonly id: string,
  deliveryDays: number,
  shippingCost: number
}

export async function getDeliveryOptions(){
  try{
    console.log('loading...');
    const checkoutEmptyEl = document.querySelector('.js-cart-empty') as HTMLElement;
    const checkoutGridEl = document.querySelector('.js-checkout-grid') as HTMLElement;

    if(checkoutEmptyEl && checkoutGridEl){
      checkoutEmptyEl.classList.add('hidden');
      checkoutGridEl.classList.add('hidden');
      console.log('this is great');
    };

    const url = 'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options';
    const response = await fetch(url);

    if(!response.ok){
      throw Error(`Unexpected error! HTTP status: ${response.status}-${response.statusText}`);
    }

    const deliveryOptions: DeliveryOption[] = await response.json();
    console.log(deliveryOptions);
    saveToStorage(deliveryOptions);
    return deliveryOptions;

  } catch(error) {
    console.error(error);
  } finally {
    const homepageSkeletonEle = document.querySelector('.js-loading-homepage') as HTMLElement;

    homepageSkeletonEle.classList.add('hidden');
  }
};

function saveToStorage(deliveryOptions: DeliveryOption[]): void{
  localStorage.setItem('kaamnaOptions', JSON.stringify(deliveryOptions));
};