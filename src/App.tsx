import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Components/HomePage/HomePage'
import { CheckoutPage } from './Components/CheckoutPage/CheckoutPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
