import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Components/HomePage/HomePage'
import { CheckoutPage } from './Components/CheckoutPage/CheckoutPage'
import { useEffect, useState } from 'react'
import type { Product } from './types/product'
import type { CartItem, DeliveryOptions } from './types/cart'
import { getCartBackend } from './services/cartApi'
import { getProductsBackend } from './services/productApi'
import { OrderPage } from './Components/OrderPage/OrderPage'
import { getDeliveryOptions } from './services/deliveryOptionsApi'

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, cartData, deliveryOptionsData] = await Promise.all([
          getProductsBackend(),
          getCartBackend(),
          getDeliveryOptions()
        ]);

        setProducts(productsData);
        setCart(cartData);
        setDeliveryOptions(deliveryOptionsData);
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
      <Route path="/checkout" element={<CheckoutPage cart={cart} products={products} setCart={setCart} deliveryOptions={deliveryOptions} />} />
      <Route path="/orders" element={<OrderPage products={products} deliveryOptions={deliveryOptions} />} />
    </Routes>
  )
}

export default App
