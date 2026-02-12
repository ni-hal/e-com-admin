'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AddProductPage() {
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    shortDesc: '',
    fullDesc: '',
    basePrice: '',
    salePrice: '',
    tax: '',
    sku: '',
    stock: '',
    lowStockThreshold: '',
    metaTitle: '',
    metaDesc: '',
    slug: '',
    status: 'Draft',
    featured: false,
    bestSeller: false,
    newArrival: false,
    onSale: false,
  })

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'variants', label: 'Variants', icon: '🎨' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'attributes', label: 'Attributes', icon: '🏷️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'labels', label: 'Labels', icon: '⭐' },
    { id: 'visibility', label: 'Visibility', icon: '👁️' },
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 mb-6 -mx-6 -mt-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <p className="text-sm text-gray-500 mt-1">Create and manage product details</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Tabs */}
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

        {/* Right Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Basic Info */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => handleChange('nameEn', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name (Arabic)
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => handleChange('nameAr', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل اسم المنتج"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={formData.shortDesc}
                    onChange={(e) => handleChange('shortDesc', e.target.value)}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief product description (max 160 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description
                  </label>
                  <textarea
                    value={formData.fullDesc}
                    onChange={(e) => handleChange('fullDesc', e.target.value)}
                    rows="6"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed product description"
                  />
                </div>
              </div>
            )}

            {/* Media */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Product Media</h2>
                
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
              </div>
            )}

            {/* Pricing */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Pricing Details</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => handleChange('basePrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => handleChange('salePrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={formData.tax}
                    onChange={(e) => handleChange('tax', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            {/* Variants */}
            {activeTab === 'variants' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Product Variants</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="PROD-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variant Options
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Size"
                      />
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="S, M, L, XL"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Color"
                      />
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Red, Blue, Green"
                      />
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  + Add Variant
                </button>
              </div>
            )}

            {/* Inventory */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Inventory Management</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleChange('stock', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      value={formData.lowStockThreshold}
                      onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 You'll receive notifications when stock falls below the threshold
                  </p>
                </div>
              </div>
            )}

            {/* Attributes */}
            {activeTab === 'attributes' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Product Attributes</h2>
                
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Attribute name (e.g., Material)"
                      />
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Value (e.g., Cotton)"
                      />
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  + Add Attribute
                </button>
              </div>
            )}

            {/* SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">SEO Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Product title for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDesc}
                    onChange={(e) => handleChange('metaDesc', e.target.value)}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Product description for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="product-url-slug"
                  />
                </div>
              </div>
            )}

            {/* Labels */}
            {activeTab === 'labels' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Product Labels</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'featured', label: 'Featured', desc: 'Show on homepage featured section' },
                    { key: 'bestSeller', label: 'Best Seller', desc: 'Mark as best selling product' },
                    { key: 'newArrival', label: 'New Arrival', desc: 'Display in new arrivals' },
                    { key: 'onSale', label: 'On Sale', desc: 'Show sale badge on product' },
                  ].map(item => (
                    <label key={item.key} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[item.key]}
                        onChange={(e) => handleChange(item.key, e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Visibility */}
            {activeTab === 'visibility' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-3">Visibility Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Publish
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to publish immediately</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Draft products are not visible to customers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
