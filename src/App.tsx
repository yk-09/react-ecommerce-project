import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Components/HomePage/HomePage'
import { CheckoutPage } from './Components/CheckoutPage/CheckoutPage'
import { useEffect, useState } from 'react'
import type { Product } from './types/product'
import type { CartItem } from './types/cart'
import { getCartBackend } from './services/cartApi'
import { getProductsBackend } from './services/productApi'

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, cartData] = await Promise.all([
          getProductsBackend(),
          getCartBackend(),
        ]);

        setProducts(productsData);
        setCart(cartData);
      }catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage products={products} isLoading={isLoading} cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} products={products} setCart={setCart} />} />
    </Routes>
  )
}

export default App
