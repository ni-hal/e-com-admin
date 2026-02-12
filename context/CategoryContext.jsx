'use client'
import { createContext, useContext, useState } from 'react'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', status: 'Active', updated: '10 Feb 2026' },
    { id: 2, name: 'Accessories', status: 'Active', updated: '08 Feb 2026' },
  ])

  const addCategory = (category) => {
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      ...category,
      updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = (id, data) => {
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, ...data, updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : c
    ))
  }

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <CategoryContext.Provider value={{ categories, setCategories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoryContext)
}
