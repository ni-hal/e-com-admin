'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { useCategories } from '@/context/CategoryContext'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'
import { FaCaretDown,FaCaretRight } from 'react-icons/fa'

export default function CategoryManagement() {
  const { categories: contextCategories, setCategories: setContextCategories } = useCategories()
  const [categories, setCategories] = useState([
    { id: 1, nameEn: 'Electronics', nameAr: 'إلكترونيات', parentId: null, sortOrder: 1, status: 'Active', slug: 'electronics', metaTitle: '', metaDesc: '', banner: '' },
    { id: 2, nameEn: 'Mobiles', nameAr: 'الهواتف المحمولة', parentId: 1, sortOrder: 1, status: 'Active', slug: 'mobiles', metaTitle: '', metaDesc: '', banner: '' },
    { id: 3, nameEn: 'Laptops', nameAr: 'أجهزة الكمبيوتر المحمولة', parentId: 1, sortOrder: 2, status: 'Active', slug: 'laptops', metaTitle: '', metaDesc: '', banner: '' },
    { id: 4, nameEn: 'Fashion', nameAr: 'أزياء', parentId: null, sortOrder: 2, status: 'Active', slug: 'fashion', metaTitle: '', metaDesc: '', banner: '' },
    { id: 5, nameEn: 'Men', nameAr: 'رجال', parentId: 4, sortOrder: 1, status: 'Active', slug: 'men', metaTitle: '', metaDesc: '', banner: '' },
    { id: 6, nameEn: 'Women', nameAr: 'نساء', parentId: 4, sortOrder: 2, status: 'Active', slug: 'women', metaTitle: '', metaDesc: '', banner: '' },
  ])

  useEffect(() => {
    setContextCategories(categories.filter(c => c.status === 'Active').map(c => ({ 
      id: c.id, 
      name: c.nameEn, 
      status: c.status 
    })))
  }, [categories, setContextCategories])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState([1, 4])
  const [formData, setFormData] = useState({
    nameEn: '', nameAr: '', parentId: null, sortOrder: 1, status: 'Active',
    slug: '', metaTitle: '', metaDesc: '', banner: ''
  })

  const getChildren = (parentId) => categories.filter(c => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder)
  const getParents = () => categories.filter(c => c.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder)

  const toggleExpand = (id) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c))
    } else {
      setCategories(prev => [...prev, { id: Math.max(...prev.map(c => c.id)) + 1, ...formData }])
    }
    handleClose()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData(category)
    setIsModalOpen(true)
  }

  const handleAddSubcategory = (parentCategory) => {
    setFormData({ nameEn: '', nameAr: '', parentId: parentCategory.id, sortOrder: 1, status: 'Active', slug: '', metaTitle: '', metaDesc: '', banner: '' })
    setIsModalOpen(true)
  }

  const getAvailableParents = () => {
    if (!editingCategory) return categories
    const childIds = new Set()
    const collectChildren = (id) => {
      childIds.add(id)
      categories.filter(c => c.parentId === id).forEach(c => collectChildren(c.id))
    }
    collectChildren(editingCategory.id)
    return categories.filter(c => !childIds.has(c.id))
  }

  const handleDelete = (id, name) => {
    const hasChildren = categories.some(c => c.parentId === id)
    if (hasChildren) {
      alert('Cannot delete category with subcategories')
      return
    }
    if (confirm(`Delete ${name}?`)) {
      setCategories(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData({ nameEn: '', nameAr: '', parentId: null, sortOrder: 1, status: 'Active', slug: '', metaTitle: '', metaDesc: '', banner: '' })
  }

  const renderCategory = (category, level = 0) => {
    const children = getChildren(category.id)
    const hasChildren = children.length > 0
    const isExpanded = expandedCategories.includes(category.id)

    return (
     <div key={category.id}>
        {/* ROW */}
        <div className="grid grid-cols-[1fr_80px_96px_128px_96px] items-center bg-gray-100 border-b hover:bg-gray-200 min-h-[56px] transition-colors duration-150">

          <div
            className="flex items-center gap-4 px-4"
            // style={{ paddingLeft: `${level * 24 + 16}px` }}
          >
            {/* Drag dots */}
            <span className="text-gray-400 cursor-move text-lg leading-none">
              ⋮⋮
            </span>

            {/* Arrow */}
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(category.id)}
                className="flex items-center justify-center w-5 h-5 text-gray-600"
              >
                {isExpanded ? (
                  <HiChevronDown size={18} />
                ) : (
                  <HiChevronRight size={18} />
                )}
              </button>
            ) : (
              <span className="w-5" />
            )}

            {/* Category name */}
            <span className="text-lg font-medium text-gray-900 ">
              {category.nameEn}
            </span>
          </div>

          {/* Sort Order */}
          <div className="text-center text-sm text-gray-600">
            {category.sortOrder}
          </div>

          {/* Status */}
          <div className="px-3">
            <span className={`px-2 py-1 text-xs rounded ${category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
              {category.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 px-3">
            <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            <button onClick={() => handleDelete(category.id, category.nameEn)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>

          {/* Add Sub */}
          <div className="px-3">
            <button onClick={() => handleAddSubcategory(category)} className="text-green-600 hover:text-green-800 text-sm">+ Sub</button>
          </div>
        </div>

        {/* Children */}
        {hasChildren &&
          isExpanded &&
          children.map(child => renderCategory(child, level + 1))}
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage categories and subcategories</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
            + Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="grid grid-cols-[1fr_80px_96px_128px_96px] items-center bg-gray-50 border-b font-medium text-sm text-gray-700">
          <div className="p-3">Category Name</div>
          <div className="p-3 text-center">Sort Order</div>
          <div className="p-3">Status</div>
          <div className="p-3">Actions</div>
          <div className="p-3"></div>
        </div>
        {getParents().length === 0 ? (
          <div className="p-8 text-center text-gray-500">No categories found</div>
        ) : (
          getParents().map(cat => renderCategory(cat))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category Name (English) *</label>
                    <input type="text" required value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category Name (Arabic) *</label>
                    <input type="text" required value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} className="w-full border rounded-lg px-3 py-2" dir="rtl" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Parent Category</label>
                    <select value={formData.parentId || ''} onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? parseInt(e.target.value) : null })} className="w-full border rounded-lg px-3 py-2">
                      <option value="">None (Top Level)</option>
                      {getAvailableParents().map(c => (
                        <option key={c.id} value={c.id}>
                          {c.parentId ? '  ↳ ' : ''}{c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input type="number" min="1" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Banner Image (Optional)</label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer">
                    <div className="text-gray-400 mb-2">📷</div>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">SEO Settings</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">URL Slug *</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="category-url-slug" className="w-full border rounded-lg px-3 py-2" />
                  <p className="text-xs text-gray-500 mt-1">URL-friendly name (lowercase, hyphens only)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Title</label>
                  <input type="text" value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} placeholder="SEO title for search engines" className="w-full border rounded-lg px-3 py-2" />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <textarea value={formData.metaDesc} onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })} rows="3" placeholder="SEO description for search engines" className="w-full border rounded-lg px-3 py-2"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
                <button type="button" onClick={handleClose} className="flex-1 border py-2 rounded-lg hover:bg-gray-50 font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
