'use client'
import { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: '₹799',
      stock: 25,
      status: 'Active',
      label: 'Featured',
      updated: '10 Feb 2026',
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: '₹1,499',
      stock: 5,
      status: 'Active',
      label: 'On Sale',
      updated: '08 Feb 2026',
    },
    {
      id: 3,
      name: 'Laptop Bag',
      category: 'Accessories',
      price: '₹999',
      stock: 0,
      status: 'Disabled',
      label: '',
      updated: '05 Feb 2026',
    },
  ])

  const addProduct = (product) => {
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...product,
      updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setProducts(prev => [...prev, newProduct])
  }

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...data, updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : p
    ))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
