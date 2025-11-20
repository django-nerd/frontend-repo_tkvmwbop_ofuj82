import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Car, Home, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow">
            <Car size={20} />
          </div>
          <div className="leading-tight">
            <p className="font-black tracking-tight text-slate-900">Arihant</p>
            <p className="text-xs uppercase tracking-widest text-slate-500">Automobiles</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" className={({isActive})=>`flex items-center gap-1 text-slate-600 hover:text-slate-900 ${isActive?'text-slate-900':''}`}><Home size={16}/> Home</NavLink>
          <NavLink to="/shop" className={({isActive})=>`text-slate-600 hover:text-slate-900 ${isActive?'text-slate-900':''}`}>Shop</NavLink>
          <NavLink to="/admin" className={({isActive})=>`flex items-center gap-1 text-slate-600 hover:text-slate-900 ${isActive?'text-slate-900':''}`}><Shield size={16}/> Admin</NavLink>
        </nav>
        <Link to="/checkout" className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:shadow transition">
          <ShoppingCart size={18} />
          <span>Cart</span>
          {count > 0 && (
            <span className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-sky-600 px-1.5 text-center text-xs font-bold text-white grid place-items-center">{count}</span>
          )}
        </Link>
      </div>
    </header>
  )
}
