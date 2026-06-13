import { OrderLink } from "./LSNavBar";
import './NavBar.css';
import { useState } from "react";

interface HamBurgerProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function HamBurger({isExpanded,setIsExpanded} : HamBurgerProps) {

  function handleClick(){
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="nav-top">
      <figure>
        <img
          src="/brand-icon.jpg"
          alt="brand icon kaamna jaha paisa khatam kaamna nai"
          width="200"
          height="80"
        />
      </figure>
      <button onClick={handleClick} className="expand-menu-btn js-expand-menu-btn">☰</button>
    </div>
  );
}

function CartWrapper() {
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
        <span className="cart-quantity js-cart-quantity-sd">1</span>
        <p>( Checkout your desires )</p>
      </a>
    </div>
  );
} 

interface MobileMenuProps {
  isExpanded: boolean;
}

function MobileMenu({isExpanded}: MobileMenuProps){
  return (
    <div className={`mobile-menu ${isExpanded ? "mobile-menu-expanded" : ""}`}
>
      <CartWrapper />
      <OrderLink />
    </div>
  )
}

export default function NavBarSmallScreen(){
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="navbar-small-screens">
      <HamBurger isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <MobileMenu isExpanded={isExpanded} />
    </nav>
  )
} 