'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Section from '@/components/ui/Section'
import { useProducts } from '@/context/ProductContext'
import { useCategories } from '@/context/CategoryContext'
import { tabs } from '@/Index/data'

export default function AddProductPage() {
  const router = useRouter()
  const { addProduct } = useProducts()
  const { categories } = useCategories()
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    nameEn: '', nameAr: '', shortDesc: '', fullDesc: '', category: '',
    basePrice: '', salePrice: '', tax: '', sku: '',
    stock: '', lowStockThreshold: '', metaTitle: '', metaDesc: '', slug: '',
    status: 'Draft', featured: false, bestSeller: false, newArrival: false, onSale: false,
  })

 

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const handlePublish = () => {
    if (!formData.nameEn || !formData.category || !formData.basePrice || !formData.stock) {
      alert('Please fill required fields: Product Name, Category, Base Price, and Stock')
      return
    }
    
    const labels = []
    if (formData.featured) labels.push('Featured')
    if (formData.bestSeller) labels.push('Best Seller')
    if (formData.newArrival) labels.push('New Arrival')
    if (formData.onSale) labels.push('On Sale')

    addProduct({
      name: formData.nameEn,
      category: formData.category,
      price: `₹${formData.basePrice}`,
      stock: parseInt(formData.stock),
      status: formData.status === 'Published' ? 'Active' : 'Disabled',
      label: labels[0] || '',
    })
    
    router.push('/products')
  }

  return (
    <AdminLayout>
      <div className="bg-white border-b px-6 py-4 mb-6 -mx-6 -mt-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <p className="text-sm text-gray-500 mt-1">Create and manage product details</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/products')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handlePublish}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border sticky top-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b last:border-b-0 transition ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-l-blue-600'
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {activeTab === 'basic' && (
              <Section title="Basic Information">
                <Input
                  label="Product Name (English)"
                  required
                  value={formData.nameEn}
                  onChange={(e) => handleChange('nameEn', e.target.value)}
                  placeholder="Enter product name"
                />
                <Input
                  label="Product Name (Arabic)"
                  value={formData.nameAr}
                  onChange={(e) => handleChange('nameAr', e.target.value)}
                  placeholder="أدخل اسم المنتج"
                  dir="rtl"
                />
                <Select
                  label="Category"
                  required
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.filter(c => c.status === 'Active').map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </Select>
                <Textarea
                  label="Short Description"
                  value={formData.shortDesc}
                  onChange={(e) => handleChange('shortDesc', e.target.value)}
                  rows="3"
                  placeholder="Brief product description (max 160 characters)"
                />
                <Textarea
                  label="Full Description"
                  value={formData.fullDesc}
                  onChange={(e) => handleChange('fullDesc', e.target.value)}
                  rows="6"
                  placeholder="Detailed product description"
                />
              </Section>
            )}

            {activeTab === 'media' && (
              <Section title="Product Media">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition cursor-pointer">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      <span className="text-3xl">+</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {activeTab === 'pricing' && (
              <Section title="Pricing Details">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Base Price (₹)"
                    required
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => handleChange('basePrice', e.target.value)}
                    placeholder="0.00"
                  />
                  <Input
                    label="Sale Price (₹)"
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => handleChange('salePrice', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <Input
                  label="Tax Percentage (%)"
                  type="number"
                  value={formData.tax}
                  onChange={(e) => handleChange('tax', e.target.value)}
                  placeholder="0"
                />
              </Section>
            )}

            {activeTab === 'variants' && (
              <Section title="Product Variants">
                <Input
                  label="SKU"
                  value={formData.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                  placeholder="PROD-001"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variant Options</label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="Size" />
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="S, M, L, XL" />
                    </div>
                    <div className="flex gap-3">
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="Color" />
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="Red, Blue, Green" />
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  + Add Variant
                </button>
              </Section>
            )}

            {activeTab === 'inventory' && (
              <Section title="Inventory Management">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Stock Quantity"
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    placeholder="0"
                  />
                  <Input
                    label="Low Stock Threshold"
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">💡 You'll receive notifications when stock falls below the threshold</p>
                </div>
              </Section>
            )}

            {activeTab === 'attributes' && (
              <Section title="Product Attributes">
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-3">
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="Attribute name (e.g., Material)" />
                      <input type="text" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" placeholder="Value (e.g., Cotton)" />
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">✕</button>
                    </div>
                  ))}
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  + Add Attribute
                </button>
              </Section>
            )}

            {activeTab === 'seo' && (
              <Section title="SEO Settings">
                <Input
                  label="Meta Title"
                  value={formData.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                  placeholder="Product title for search engines"
                />
                <p className="text-xs text-gray-500 -mt-4">Recommended: 50-60 characters</p>
                <Textarea
                  label="Meta Description"
                  value={formData.metaDesc}
                  onChange={(e) => handleChange('metaDesc', e.target.value)}
                  rows="3"
                  placeholder="Product description for search engines"
                />
                <p className="text-xs text-gray-500 -mt-4">Recommended: 150-160 characters</p>
                <Input
                  label="URL Slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="product-url-slug"
                />
              </Section>
            )}

            {activeTab === 'labels' && (
              <Section title="Product Labels">
                <div className="space-y-4">
                  <Checkbox
                    label="Featured"
                    description="Show on homepage featured section"
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                  />
                  <Checkbox
                    label="Best Seller"
                    description="Mark as best selling product"
                    checked={formData.bestSeller}
                    onChange={(e) => handleChange('bestSeller', e.target.checked)}
                  />
                  <Checkbox
                    label="New Arrival"
                    description="Display in new arrivals"
                    checked={formData.newArrival}
                    onChange={(e) => handleChange('newArrival', e.target.checked)}
                  />
                  <Checkbox
                    label="On Sale"
                    description="Show sale badge on product"
                    checked={formData.onSale}
                    onChange={(e) => handleChange('onSale', e.target.checked)}
                  />
                </div>
              </Section>
            )}

            {activeTab === 'visibility' && (
              <Section title="Visibility Settings">
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </Select>
                <Input
                  label="Schedule Publish"
                  type="datetime-local"
                />
                <p className="text-xs text-gray-500 -mt-4">Leave empty to publish immediately</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">⚠️ Draft products are not visible to customers</p>
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
