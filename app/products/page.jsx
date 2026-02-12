'use client'
import { useState, useMemo } from 'react'
import AdminLayout from '@/components/AdminLayout'
import ProductModal from '@/components/ProductModal'
import Link from 'next/link'
import { useProducts } from '@/context/ProductContext'
import { useCategories } from '@/context/CategoryContext'

export default function ProductList() {
  const { products, setProducts } = useProducts()
  const { categories } = useCategories()
  const [selected, setSelected] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Filter logic with search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !categoryFilter || p.category === categoryFilter
      const matchesStatus = !statusFilter || p.status === statusFilter
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, searchQuery, categoryFilter, statusFilter])

  // Select all toggle
  const toggleSelectAll = () => {
    if (selected.length === filteredProducts.length) {
      setSelected([])
    } else {
      setSelected(filteredProducts.map(p => p.id))
    }
  }

  // Select product
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    )
  }

  // Bulk Actions
  const bulkStatusChange = (status) => {
    setProducts((prev) =>
      prev.map((p) =>
        selected.includes(p.id) ? { ...p, status } : p
      )
    )
    setSelected([])
  }

  const bulkDelete = () => {
    if (!confirm('Delete selected products?')) return
    setProducts((prev) =>
      prev.filter((p) => !selected.includes(p.id))
    )
    setSelected([])
  }

  // Individual delete
  const deleteProduct = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return
    setProducts(prev => prev.filter(p => p.id !== id))
    setSelected(prev => prev.filter(i => i !== id))
  }

  // Add/Edit product
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
          : p
      ))
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...productData,
        updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      }
      setProducts(prev => [...prev, newProduct])
    }
    setEditingProduct(null)
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link
          href="/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded flex-1 min-w-[200px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.filter(c => c.status === 'Active').map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Disabled</option>
        </select>

        {(searchQuery || categoryFilter || statusFilter) && (
          <button
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter('')
              setStatusFilter('')
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bg-yellow-50 border p-3 rounded mb-4 flex gap-3 items-center">
          <span className="font-medium">{selected.length} selected</span>
          <button
            onClick={() => bulkStatusChange('Active')}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Enable
          </button>
          <button
            onClick={() => bulkStatusChange('Disabled')}
            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            Disable
          </button>
          <button
            onClick={bulkDelete}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={() => setSelected([])}
            className="ml-auto text-gray-600 hover:text-gray-800"
          >
            Deselect All
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={selected.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">Label</th>
              <th className="p-3">Updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">
                  {searchQuery || categoryFilter || statusFilter 
                    ? 'No products match your filters' 
                    : 'No products found'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="cursor-pointer"
                    />
                  </td>

                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.price}</td>

                  <td className="p-3">
                    <span
                      className={
                        p.stock === 0
                          ? 'text-red-600 font-semibold'
                          : p.stock < 10
                          ? 'text-yellow-600 font-semibold'
                          : 'text-green-600'
                      }
                    >
                      {p.stock}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        p.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {p.label && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                        {p.label}
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-gray-600">{p.updated}</td>
                  
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p)
                          setIsModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id, p.name)}
                        className="text-red-600 hover:text-red-800 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </AdminLayout>
  )
}
