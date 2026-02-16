'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types'

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[] | ((prev: Product[]) => Product[])) => void;
  addProduct: (product: Omit<Product, 'id' | 'updated'>) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
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

  const addProduct = (product: Omit<Product, 'id' | 'updated'>) => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...product,
      updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setProducts(prev => [...prev, newProduct])
  }

  const updateProduct = (id: number, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...data, updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : p
    ))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProducts must be used within ProductProvider')
  return context
}
