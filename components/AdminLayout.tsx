'use client'
import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import ProfileMenu from './ProfileMenu'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        <div className="p-5 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
          Admin Panel
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</Link>
          <Link href="/categories" className="block px-3 py-2 rounded hover:bg-gray-700">Categories</Link>
          <Link href="/products" className="block px-3 py-2 rounded hover:bg-gray-700">Products</Link>
          <Link href="/order" className="block px-3 py-2 rounded hover:bg-gray-700">Orders</Link>
          <Link href="/customers" className="block px-3 py-2 rounded hover:bg-gray-700">Customers</Link>
          <Link href="/promotions" className="block px-3 py-2 rounded hover:bg-gray-700">Coupon</Link>
          <Link href="/shipping" className="block px-3 py-2 rounded hover:bg-gray-700">Shipping Details</Link>
          <Link href="/reports" className="block px-3 py-2 rounded hover:bg-gray-700">Reports</Link>
          <Link href="/settings" className="block px-3 py-2 rounded hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />}

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold"></h1>
          </div>
          <ProfileMenu />
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
