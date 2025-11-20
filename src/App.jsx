import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Checkout from './components/Checkout'
import Admin from './components/Admin'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

function Home(){
  return (
    <>
      <Hero />
      <Shop />
      <footer className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-slate-500 text-sm">© {new Date().getFullYear()} Arihant Automobiles. All rights reserved.</div>
      </footer>
    </>
  )
}

export default function App(){
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </CartProvider>
  )
}
