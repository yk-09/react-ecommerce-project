export function HomePage(){
  return (

    <>
      <title>Homepage</title>

      <article className="loading-homepage js-loading-homepage">
        <nav className="nav">
          <div className="image skeleton"></div>
          <div className="search skeleton"></div>
          <div className="return-orders skeleton"></div>
          <div className="hart skeleton"></div>
        </nav>

        <section className="hero-section">
          <div className="p-1 skeleton"></div>
          <div className="p-2 skeleton"></div>
        </section>

        <section className="products-grid">
          <article className="product skeleton">
          </article>
          <article className="product skeleton">
          </article>
          <article className="product skeleton">
          </article>
          <article className="product skeleton">
          </article>
          <article className="product skeleton">
          </article>
          <article className="product skeleton">
          </article>
        </section>
      </article>

      <header className="hidden js-homepage-header">
        <nav className="navbar-large-screens">
          <figure>
            <img src="/brand-icon.jpg" alt="kaamna brand icon jaha paisa khatam kaamna nahi " width="200" height="80" />
          </figure>
          <form action="" method="get">
            <label htmlFor="search-bar" className="sr-only"></label>
            <button type="submit">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <input id="search-bar-ld" name="search-bar" type="search" placeholder="Apni kaamna khojiye (search your desires)" />
          </form>
          <a href="orders.html" className="order-page-link">
            Returns&Orders
          </a>
          <div className="cart-wrapper">
            <a href="checkout.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
               >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
              <span className="cart-quantity js-cart-quantity-ld">1</span>
            </a>
          </div>
        </nav>
        <nav className="navbar-small-screens">
          <div className="nav-top">
            <figure>
              <img src="/brand-icon.jpg" alt="brand icon kaamna jaha paisa khatam kaamna nai" width="200" height="80" />
            </figure>
            <button className="expand-menu-btn js-expand-menu-btn">☰</button>
          </div>
          <div className="mobile-menu js-mobile-menu">
            <div className="cart-wrapper">
              <a href="checkout.html">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  />
                </svg>
                <span className="cart-quantity js-cart-quantity-sd">1</span>
                <p>
                  ( Checkout your desires )
                </p>
              </a>
            </div>
            <a href="orders.html" className="order-page-link">
              Returns&Orders
            </a>
          </div>
        </nav>
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <input id="search-bar" name="search-bar" type="text" placeholder="Search your desires" />
        </form>
      </header>

      <section className="hero-container js-hero-section hidden">
        <h1 className="hero-main">
          Jaha <span className="red-line">Paisa</span> khatam hota hai... <br />
          <span className="green-underline">Par Kaamna nahi.</span>
        </h1>
        <p className="hero-italic">
          Try karke dekhlo.
        </p>
      </section>

      <section className="container my-5">
        <div
          className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4 js-products-row"
        >
           {/* generating prodycts html using javascript  */}
        </div>
      </section>
    </>
  )
}