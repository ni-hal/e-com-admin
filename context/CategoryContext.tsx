'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Category } from '@/types'

interface CategoryContextType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, 'id' | 'updated'>) => void;
  updateCategory: (id: number, data: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Electronics', status: 'Active', updated: '10 Feb 2026' },
    { id: 2, name: 'Accessories', status: 'Active', updated: '08 Feb 2026' },
  ])

  const addCategory = (category: Omit<Category, 'id' | 'updated'>) => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      ...category,
      updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = (id: number, data: Partial<Category>) => {
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, ...data, updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : c
    ))
  }

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <CategoryContext.Provider value={{ categories, setCategories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (!context) throw new Error('useCategories must be used within CategoryProvider')
  return context
}
