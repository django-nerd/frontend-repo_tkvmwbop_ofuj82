import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
        return copy
      }
      return [...prev, { ...product, quantity: qty }]
    })
  }

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const updateQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p))
  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.quantity * i.price, 0), [items])

  const value = { items, add, remove, updateQty, clear, count, subtotal }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
