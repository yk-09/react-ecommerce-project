import formatCurrency from './utility/format-currency';
import { addToHart, getCartBackend, updateCartQuantity } from './data/cart';
import { getProducts } from './data/products';

// expanding navbar
const expandBtnEle = document.querySelector(".js-expand-menu-btn") as HTMLButtonElement;
const mobileMenuEle = document.querySelector(".js-mobile-menu") as HTMLDivElement;

if(expandBtnEle && mobileMenuEle){
  expandBtnEle.addEventListener("click", () => {
    mobileMenuEle.classList.toggle("mobile-menu-expanded");
  });
};

getProducts(renderProductsHtml);
getCartBackend()
  .then((cart) => {
    const cartQuantityLdEl = document.querySelector('.js-cart-quantity-ld') as HTMLSpanElement;
    const cartQuantitySdEl = document.querySelector('.js-cart-quantity-sd') as HTMLSpanElement;

    const cartQuantity: number = updateCartQuantity(cart);
    cartQuantityLdEl.innerText = cartQuantity.toString();
    cartQuantitySdEl.innerText = cartQuantity.toString();
  });
console.log('got products')

export interface Rating {
  stars: number,
  count: number
}

export interface Product {
  readonly id: string,
  image: string,
  name: string, 
  rating: Rating,
  pricePaisa: number
}

function renderProductsHtml(products: Product[]): void {

  const productsRowEle = document.querySelector(".js-products-row") as HTMLDivElement;

  const productsHtml = products
    .map((product: Product): string => {
      const productHtml = `
      <div class="col">
        <article class="card">
          <figure class="image-box">
            <img loading="lazy" src="${product.image}" class="card-img-top" alt="${product.name} image">
          </figure>
          <div class="card-body">
            <p class="card-title">${product.name}</p>
            <p class="card-text">
              ₹${formatCurrency(product.pricePaisa)}
            </p>
            <div class="product-ratings">
              <!-- <img src="" alt=""> -->
              <div>
                ★★★★★
              </div>
              <div class="reviews">
                (${product.rating.count})
              </div>
            </div>
            <select name="product-quantity" id="js-quantity-selector-${
              product.id
            }">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <div class="added-message js-added-message">✔ Added</div>
            <button class="btn add-to-cart-button js-add-to-hart-button" data-product-id="${
              product.id
            }">
              Add to Hart
            </button>
          </div>
        </article>
      </div>
      `;
      return productHtml;
    })
    .join("");

  // console.log(productsHTML);
  if(productsRowEle){
    productsRowEle.innerHTML = productsHtml;
  }
  

  // after te html is rendered make add to hart button interactive 
  let timeoutId: ReturnType<typeof setTimeout>
  if(productsRowEle){
    productsRowEle.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

        if(target.matches('.js-add-to-hart-button')){
          const { productId } = target.dataset as { productId: string };
          const addedessage = target.previousElementSibling as HTMLDivElement
          const quantitySelectorEle = addedessage.previousElementSibling as HTMLSelectElement;
          const productQuantity: number = Number(quantitySelectorEle.value);
          
          addToHart(productId, productQuantity);
          if(timeoutId){
            clearTimeout(timeoutId);
            timeoutId = handleAddedMessage(target);
          }else{
            timeoutId = handleAddedMessage(target);
          };
        }
    });
  }

};

function handleAddedMessage(target: HTMLElement){
  const addedMessageEle = target.previousElementSibling as HTMLDivElement;
  console.log(addedMessageEle);
  addedMessageEle.classList.add('show');

  return ( 
    setTimeout(()=>{
      addedMessageEle.classList.remove('show');
    },1000)
  )
}

const headerEle = document.querySelector('header') as HTMLElement;
if(headerEle){
  document.addEventListener('scroll', () => {
    if(scrollY > 151){
      headerEle.classList.add('fixed');
    }else{
      headerEle.classList.remove('fixed');
    }
  });
};