'use client'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
            Orders
          </Link>
          <Link href="/products" className="block px-3 py-2 rounded hover:bg-gray-700">
            Products
          </Link>
          <Link href="/categories" className="block px-3 py-2 rounded hover:bg-gray-700">
            Categories
          </Link>
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
            Customers
          </Link>
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
            Reports
          </Link>
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
