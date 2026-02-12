'use client'
import { useState, useEffect } from 'react'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import Select from './ui/Select'
import Checkbox from './ui/Checkbox'
import { useCategories } from '@/context/CategoryContext'

export default function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const { categories } = useCategories()
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    status: 'Active',
    label: '',
    shortDesc: '',
    sku: '',
    featured: false,
    bestSeller: false,
    newArrival: false,
    onSale: false,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.replace('₹', '').replace(',', ''),
        stock: product.stock,
        status: product.status,
        label: product.label || '',
        shortDesc: product.shortDesc || '',
        sku: product.sku || '',
        featured: product.label === 'Featured',
        bestSeller: product.label === 'Best Seller',
        newArrival: product.label === 'New Arrival',
        onSale: product.label === 'On Sale',
      })
    } else {
      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        status: 'Active',
        label: '',
        shortDesc: '',
        sku: '',
        featured: false,
        bestSeller: false,
        newArrival: false,
        onSale: false,
      })
    }
  }, [product, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const labels = []
    if (formData.featured) labels.push('Featured')
    if (formData.bestSeller) labels.push('Best Seller')
    if (formData.newArrival) labels.push('New Arrival')
    if (formData.onSale) labels.push('On Sale')

    onSave({
      name: formData.name,
      category: formData.category,
      price: `₹${formData.price}`,
      stock: parseInt(formData.stock),
      status: formData.status,
      label: labels[0] || '',
      shortDesc: formData.shortDesc,
      sku: formData.sku,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.filter(c => c.status === 'Active').map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </Select>

            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="PROD-001"
            />
          </div>

          <Textarea
            label="Short Description"
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            rows="2"
            placeholder="Brief product description"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              required
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <Input
              label="Stock"
              required
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
          </div>

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option>Active</option>
            <option>Disabled</option>
          </Select>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Labels</label>
            <div className="space-y-2">
              <Checkbox
                label="Featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <Checkbox
                label="Best Seller"
                checked={formData.bestSeller}
                onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
              />
              <Checkbox
                label="New Arrival"
                checked={formData.newArrival}
                onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
              />
              <Checkbox
                label="On Sale"
                checked={formData.onSale}
                onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
