import { Product } from "../homepage";
const productsData = localStorage.getItem('kamnaProducts') || '[]';
export const products: Product[]  = JSON.parse(productsData);

type RenderProducts = (products: Product[]) => void

export async function getProducts(renderProductsHtml: RenderProducts) {

  const homepageSkeletonEle = document.querySelector('.js-loading-homepage') as HTMLElement;
  const headerEle = document.querySelector('.js-homepage-header') as HTMLElement;
  const heroSectionEle = document.querySelector('.js-hero-section') as HTMLElement;

  try {
    // console.log("loading...");

    const response = await fetch(
      "https://69ada80eb50a169ec87fef13.mockapi.io/products"
    );

    if (!response.ok) {
      throw new Error(`http error status: ${response.status}`);
    }
    const products = await response.json();
    console.log(products);

    localStorage.setItem("kamnaProducts", JSON.stringify(products));

    renderProductsHtml(products);
  } catch (error) {
    console.log("unexpected error! please try again later!");
    console.log(error);
  }
  finally{
    if(headerEle && heroSectionEle && homepageSkeletonEle){
      headerEle.classList.remove('hidden');
      heroSectionEle.classList.remove('hidden');
      homepageSkeletonEle.classList.add('hidden');
    }
  }
}