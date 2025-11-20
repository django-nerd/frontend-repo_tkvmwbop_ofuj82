import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ title: '', price: 0, category: 'Accessories', description: '', stock: 0, images: '' , featured: false})
  const [key, setKey] = useState('')

  const load = async () => {
    const res = await fetch(`${API}/api/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images ? form.images.split(',').map(s=>s.trim()) : []
    }
    const res = await fetch(`${API}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Admin-Key': key }, body: JSON.stringify(payload) })
    if(res.ok){
      setForm({ title: '', price: 0, category: 'Accessories', description: '', stock: 0, images: '', featured: false })
      load()
      alert('Product created')
    } else {
      const data = await res.json();
      alert(data.detail || 'Failed')
    }
  }

  const del = async (id) => {
    if(!confirm('Delete this product?')) return
    const res = await fetch(`${API}/api/products/${id}`, { method: 'DELETE', headers: { 'X-Admin-Key': key } })
    if(res.ok){
      load()
    } else {
      const data = await res.json();
      alert(data.detail || 'Failed')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-500">Manage products and orders</p>
          </div>
          <input placeholder="Admin API key" value={key} onChange={e=> setKey(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2"/>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <form onSubmit={create} className="space-y-3 rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900">Create product</h2>
            <input required placeholder="Title" value={form.title} onChange={e=> setForm(v=>({...v, title:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <textarea placeholder="Description" value={form.description} onChange={e=> setForm(v=>({...v, description:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <div className="grid grid-cols-2 gap-3">
              <input required type="number" placeholder="Price" value={form.price} onChange={e=> setForm(v=>({...v, price:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
              <input required type="number" placeholder="Stock" value={form.stock} onChange={e=> setForm(v=>({...v, stock:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Category" value={form.category} onChange={e=> setForm(v=>({...v, category:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.featured} onChange={e=> setForm(v=>({...v, featured: e.target.checked}))}/> Featured</label>
            </div>
            <input placeholder="Image URLs (comma separated)" value={form.images} onChange={e=> setForm(v=>({...v, images:e.target.value}))} className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <button className="rounded-full bg-slate-900 px-5 py-2 text-white font-semibold">Create</button>
          </form>

          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Products</h2>
            <div className="divide-y">
              {products.map(p => (
                <div key={p.id} className="py-4 flex items-center gap-4">
                  <img src={p.images?.[0] || 'https://via.placeholder.com/60'} className="h-14 w-20 rounded-md object-cover"/>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{p.title}</p>
                    <p className="text-sm text-slate-500">₹{p.price} • {p.category}</p>
                  </div>
                  <button onClick={()=> del(p.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
