import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({product}){
  const { add } = useCart()
  return (
    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition"/>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900 leading-tight">{product.title}</h3>
          <p className="text-sm text-slate-500">{product.category}</p>
        </div>
        <p className="font-bold text-slate-900">₹{product.price.toLocaleString()}</p>
      </div>
      <button onClick={()=> add(product, 1)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white text-sm font-semibold hover:bg-slate-800 transition">
        <ShoppingCart size={16}/> Add to cart
      </button>
    </motion.div>
  )
}
