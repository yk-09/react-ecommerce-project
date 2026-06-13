import axios from 'axios'
import { useState, useEffect } from 'react';
import formatCurrency from '../utility/formatCurrency';

interface Rating {
    stars: number,
    count: number
  }

interface Product {
  readonly id: string,
  image: string,
  name: string, 
  rating: Rating,
  pricePaisa: number
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="col">
      <article className="card">
        <figure className="image-box">
          <img
            loading="lazy"
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </figure>
        <div className="card-body">
          <p className="card-title">{product.name}</p>
          <p className="card-text">₹{formatCurrency(product.pricePaisa)}</p>
          <div className="product-ratings">
            {/* <img src="" alt="" />  */}
            <div>★★★★★</div>
            <div className="reviews">({product.rating.count})</div>
          </div>
          <select
            name="product-quantity"
            id="js-quantity-selector-${
                  product.id
                }"
          >
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
          <div className="added-message js-added-message">✔ Added</div>
          <button
            className="btn add-to-cart-button js-add-to-hart-button"
            data-product-id="${
                  product.id
                }"
          >
            Add to Hart
          </button>
        </div>
      </article>
    </div>
  );
}

export function ProductsGrid(){

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts(){
      try{
        const res =  await axios.get<Product[]>(
          'https://69ada80eb50a169ec87fef13.mockapi.io/products'
        );

        const data = res.data;
        setProducts(data);

      }catch(error){
        console.error(error);
      }finally{
        console.log('done');
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="container my-5">
      <div
        className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4 js-products-row"
      >
        {products.map((product) => {
          return <ProductCard key={product.id} product={product}/>
        })}
      </div>
    </section>
  )
}
