import './HomePage.css';
import MySkeleton from './SkeletonLoad';
import './Skeleton.css';
import MyNavBarForLargeScreen from './LSNavBar';
import NavBarSmallScreen from './SSNavBar';
import './NavBar.css';
import { ProductsGrid } from './Products';
import { useState } from 'react';

export function HomePage(){

  const [displayStatus, setDisplayStatus] = useState('');

  return (

    <>
      <title>Homepage</title>

      <header style={{display: displayStatus === 'none' ? 'block' : 'none'}}>
        <MyNavBarForLargeScreen />
        <NavBarSmallScreen />
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
          <input id="search-bar" name="search-bar" type="text" placeholder="Search your desires" />
        </form>
      </header>

      <main>
        <MySkeleton displayStatus={displayStatus}/>

        <section className="hero-container js-hero-section hidden">
          <h1 className="hero-main">
            Jaha <span className="red-line">Paisa</span> khatam hota hai... <br />
            <span className="green-underline">Par Kaamna nahi.</span>
          </h1>
          <p className="hero-italic">
            Try karke dekhlo.
          </p>
        </section>

        <ProductsGrid setDisplayStatus={setDisplayStatus} />
        
      </main>
    </>
  )
}