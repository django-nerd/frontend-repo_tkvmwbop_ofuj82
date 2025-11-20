import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout(){
  const { items, subtotal, updateQty, remove, clear } = useCart()

  const placeOrder = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const customer = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      address: form.get('address'),
      city: form.get('city'),
      state: form.get('state'),
      postal_code: form.get('postal_code'),
    }

    const payload = {
      items: items.map(i=> ({ product_id: i.id, title: i.title, price: i.price, quantity: i.quantity, image: i.images?.[0] })),
      customer,
      subtotal,
      shipping: 0,
      total: subtotal,
      status: 'pending'
    }

    const res = await fetch(`${API}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if(res.ok){
      alert(`Order placed! ID: ${data}`)
      clear()
    }else{
      alert(data.detail || 'Failed to place order')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Checkout</h1>
          {items.length === 0 ? (
            <p className="text-slate-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/80'} className="h-16 w-20 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">₹{item.price.toLocaleString()}</p>
                  </div>
                  <input type="number" min={1} value={item.quantity} onChange={e => updateQty(item.id, parseInt(e.target.value||'1'))} className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <button onClick={()=> remove(item.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-slate-600">Subtotal</p>
                <p className="text-xl font-bold text-slate-900">₹{subtotal.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Shipping details</h2>
          <form onSubmit={placeOrder} className="space-y-3">
            <input required name="name" placeholder="Full name" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <input required type="email" name="email" placeholder="Email" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <input name="phone" placeholder="Phone" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <input required name="address" placeholder="Address" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <div className="grid grid-cols-2 gap-3">
              <input name="city" placeholder="City" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
              <input name="state" placeholder="State" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            </div>
            <input name="postal_code" placeholder="Postal code" className="w-full rounded-lg border border-slate-300 px-4 py-2"/>
            <button disabled={items.length===0} className="w-full rounded-full bg-slate-900 text-white px-6 py-3 font-semibold disabled:opacity-50">Place order</button>
          </form>
        </div>
      </div>
    </div>
  )
}
