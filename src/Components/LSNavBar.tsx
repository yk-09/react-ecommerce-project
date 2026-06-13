import './NavBar.css';

function BrandIcon() {
  return (
    <figure>
      <img
        src="/brand-icon.jpg"
        alt="kaamna brand icon jaha paisa khatam kaamna nahi "
        width="200"
        height="80"
      />
    </figure>
  );
}

function SearchBar() {
  return (
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      <input
        id="search-bar-ld"
        name="search-bar"
        type="search"
        placeholder="Apni kaamna khojiye (search your desires)"
      />
    </form>
  );
}

export function OrderLink() {
  return (
    <a href="orders.html" className="order-page-link">
      Returns&Orders
    </a>
  );
}

function CartIcon() {
  return (
    <div className="cart-wrapper">
      <a href="checkout.html">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <span className="cart-quantity js-cart-quantity-ld">1</span>
      </a>
    </div>
  );
}

export default function NavBarLargeScreens(){
  return (
    <nav className="navbar-large-screens">
      <BrandIcon />
      <SearchBar />
      <OrderLink />
      <CartIcon />
    </nav>
  )
}