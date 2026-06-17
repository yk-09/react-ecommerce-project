import './HomePage.css';
import MySkeleton from '../SkeletonLoad/SkeletonLoad';
import '../SkeletonLoad/Skeleton.css';
import MyNavBarForLargeScreen from '../Navbar/LSNavBar';
import NavBarSmallScreen, { SearchProducts } from '../Navbar/SSNavBar';
import '../Navbar/NavBar.css';
import { ProductsGrid } from './Products';
import { useState } from 'react';
import type { CartItem } from "../../types/cart";
import { productsData } from '../../services/products-data';
import type { Product } from '../../types/product';

export function HomePage(){

  const [displayStatus, setDisplayStatus] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const cartQuantity = cart.reduce(
    (sum, item) => sum + item.productQuantity,
    0
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      setFilteredProducts([]);
      return;
    }

    const newProducts = productsData.filter(
      (product, index) =>
        product.name.toLowerCase().includes(searchTerm) &&
        index < 10
    );

    setFilteredProducts(newProducts);
  }
  return (

    <>
      <title>Homepage</title>

      <header style={{display: displayStatus === 'none' ? 'block' : 'none'}}>
        <MyNavBarForLargeScreen cartQuantity={cartQuantity} handleChange={handleChange} />
        <NavBarSmallScreen cartQuantity={cartQuantity} />
        <form className="search-products-sd" action="" method="get">
          <label className="sr-only" htmlFor="search-bar">search products</label>
          <button type="submit">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <input id="search-bar" name="search-bar" type="text" placeholder="Search your desires" onChange={handleChange} />
        </form>
        {filteredProducts.length !== 0 && <SearchProducts filteredProducts={filteredProducts} />}
      </header>

      <main>
        <MySkeleton displayStatus={displayStatus}/>

        <section className="hero-container js-hero-section">
          <h1 className="hero-main">
            Jaha <span className="red-line">Paisa</span> khatam hota hai... <br />
            <span className="green-underline">Par Kaamna nahi.</span>
          </h1>
          <p className="hero-italic">
            Try karke dekhlo.
          </p>
        </section>

        <ProductsGrid setDisplayStatus={setDisplayStatus} setCart={setCart} />
        
      </main>
    </>
  )
}