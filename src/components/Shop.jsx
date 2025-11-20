import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Shop(){
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const controller = new AbortController()
    const load = async () => {
      try{
        const res = await fetch(`${API}/api/products?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        const data = await res.json()
        setProducts(data)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [query])

  return (
    <section id="shop" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Shop</h2>
          <input value={query} onChange={e=> setQuery(e.target.value)} placeholder="Search products..." className="w-64 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
        </div>
        {loading ? (
          <p className="text-slate-500">Loading products...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
