import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import formatCurrency from '../utility/formatCurrency';
import type { Product, ProductsGridProps, ProductCardProps } from '../types/product';
import { handleAddToCart } from "../services/cartService";

function ProductCard({ product, setCart }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isAddedDisplay, setIsAddedDisplay] = useState(false);

  const timerRef = useRef<number | null>(null);

  function displayAddedMessage() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsAddedDisplay(false);
    }, 1000);
  }

  function handleChange (
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newQuantity = Number(e.target.value);
    setProductQuantity(newQuantity);
  }

  async function addProduct() {
    try {
      setLoading(true);

      const updatedCart = await handleAddToCart(
        product.id,
        productQuantity
      );

      setCart(updatedCart);
      setIsAddedDisplay(true);
      displayAddedMessage();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
            onChange={handleChange}
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
          {isAddedDisplay && <div className="added-message">✔ Added</div>}
          <button
            onClick={addProduct}
            className="btn add-to-cart-button"
          >
            {loading && <span className="spinner"></span>}
            <span>Add to Hart</span>
          </button>
        </div>
      </article>
    </div>
  );
}

export function ProductsGrid({setDisplayStatus, setCart} : ProductsGridProps){

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
        setDisplayStatus('none');
      }
    }

    fetchProducts();
  }, [setDisplayStatus]);

  return (
    <section className="container my-5">
      <div
        className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4"
      >
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} setCart={setCart}/>
        })}
      </div>
    </section>
  )
}
