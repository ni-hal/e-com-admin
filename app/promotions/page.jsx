'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [showBannerForm, setShowBannerForm] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState({ type: '', coupon: null })

  const [coupons, setCoupons] = useState([
    { id: 1, code: 'SAVE10', type: 'Percentage', value: '10%', minCart: '₹500', usage: 25, validFrom: '01 Feb 2026', validTo: '28 Feb 2026', status: 'Active' },
    { id: 2, code: 'FLAT100', type: 'Fixed', value: '₹100', minCart: '₹1000', usage: 10, validFrom: '01 Feb 2026', validTo: '10 Feb 2026', status: 'Expired' },
    { id: 3, code: 'WELCOME50', type: 'Fixed', value: '₹50', minCart: '₹300', usage: 50, validFrom: '01 Jan 2026', validTo: '31 Dec 2026', status: 'Active' },
    { id: 4, code: 'MEGA20', type: 'Percentage', value: '20%', minCart: '₹2000', usage: 5, validFrom: '15 Feb 2026', validTo: '20 Feb 2026', status: 'Disabled' },
  ])

  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale Banner', image: '/banner1.jpg', url: '/sale/summer', startDate: '01 Mar 2026', endDate: '15 Mar 2026', status: 'Active' },
    { id: 2, title: 'Festival Offer Banner', image: '/banner2.jpg', url: '/sale/festival', startDate: '10 Feb 2026', endDate: '28 Feb 2026', status: 'Active' },
  ])

  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    minCart: '',
    usageLimit: '',
    perUserLimit: '',
    validFrom: '',
    validTo: '',
    appliesTo: 'All Products',
    category: '',
    product: ''
  })

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-700',
      Expired: 'bg-gray-100 text-gray-700',
      Disabled: 'bg-red-100 text-red-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || coupon.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleCreateCoupon = () => {
    setEditingCoupon(null)
    setCouponForm({
      code: '',
      type: 'Percentage',
      value: '',
      minCart: '',
      usageLimit: '',
      perUserLimit: '',
      validFrom: '',
      validTo: '',
      appliesTo: 'All Products',
      category: '',
      product: ''
    })
    setShowCouponModal(true)
  }

  const handleSaveCoupon = () => {
    setShowCouponModal(false)
  }

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon)
    setCouponForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minCart: coupon.minCart,
      usageLimit: coupon.usage.toString(),
      perUserLimit: '1',
      validFrom: '',
      validTo: '',
      appliesTo: 'All Products',
      category: '',
      product: ''
    })
    setShowCouponModal(true)
  }

  const handleToggleStatus = (coupon) => {
    setConfirmAction({ type: 'toggle', coupon })
    setShowConfirmModal(true)
  }

  const handleDeleteCoupon = (coupon) => {
    setConfirmAction({ type: 'delete', coupon })
    setShowConfirmModal(true)
  }

  const confirmActionHandler = () => {
    if (confirmAction.type === 'toggle') {
      setCoupons(coupons.map(c =>
        c.id === confirmAction.coupon.id
          ? { ...c, status: c.status === 'Active' ? 'Disabled' : 'Active' }
          : c
      ))
    } else if (confirmAction.type === 'delete') {
      setCoupons(coupons.filter(c => c.id !== confirmAction.coupon.id))
    } else if (confirmAction.type === 'deleteBanner') {
      setBanners(banners.filter(b => b.id !== confirmAction.banner.id))
    }
    setShowConfirmModal(false)
  }

  const handleEditBanner = (banner) => {
    setShowBannerForm(true)
  }

  const handleDeleteBanner = (banner) => {
    setConfirmAction({ type: 'deleteBanner', banner })
    setShowConfirmModal(true)
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Promotions & Coupons</h1>
        <p className="text-gray-500 text-sm">Manage discount offers and promotional banners</p>
      </div>

      {/* Coupon List Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-5 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by coupon code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded text-sm flex-1"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <button
              onClick={handleCreateCoupon}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
            >
              Create Coupon
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Coupon Code</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Discount Value</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Min Cart Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Usage Count</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Validity</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{coupon.code}</td>
                  <td className="px-4 py-3 text-gray-600">{coupon.type}</td>
                  <td className="px-4 py-3 font-semibold">{coupon.value}</td>
                  <td className="px-4 py-3 text-gray-600">{coupon.minCart}</td>
                  <td className="px-4 py-3 text-gray-600">{coupon.usage} uses</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{coupon.validFrom} – {coupon.validTo}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditCoupon(coupon)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => handleToggleStatus(coupon)} className="text-orange-600 hover:text-orange-800 text-xs font-medium">
                        {coupon.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => handleDeleteCoupon(coupon)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promo Banners Section  want to edit and delete */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Homepage Banners</h2>
          <button
            onClick={() => setShowBannerForm(!showBannerForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
          >
            {showBannerForm ? 'Cancel' : 'Add Banner'}
          </button>
        </div>

        {showBannerForm && (
          <div className="p-5 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Banner Image</label>
                <input type="file" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
              Save Banner
            </button>
          </div>
        )}

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="border rounded-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {banner.title}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{banner.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{banner.startDate} – {banner.endDate}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(banner.status)}`}>
                  {banner.status}
                </span>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEditBanner(banner)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                  <button onClick={() => handleDeleteBanner(banner)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-5">
              <h2 className="font-semibold text-lg mb-4">
                {confirmAction.type === 'delete' ? 'Delete Coupon' : confirmAction.type === 'deleteBanner' ? 'Delete Banner' : 'Change Status'}
              </h2>
              <p className="text-gray-600 mb-6">
                {confirmAction.type === 'delete'
                  ? `Are you sure you want to delete coupon "${confirmAction.coupon?.code}"? This action cannot be undone.`
                  : confirmAction.type === 'deleteBanner'
                  ? `Are you sure you want to delete banner "${confirmAction.banner?.title}"? This action cannot be undone.`
                  : `Are you sure you want to ${confirmAction.coupon?.status === 'Active' ? 'disable' : 'enable'} coupon "${confirmAction.coupon?.code}"?`
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmActionHandler}
                  className={`px-4 py-2 rounded text-sm font-medium text-white ${confirmAction.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">{editingCoupon ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <button onClick={() => setShowCouponModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="e.g., SAVE10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  >
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="text"
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder={couponForm.type === 'Percentage' ? '10' : '100'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cart Amount</label>
                  <input
                    type="text"
                    value={couponForm.minCart}
                    onChange={(e) => setCouponForm({ ...couponForm, minCart: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit (Total)</label>
                  <input
                    type="text"
                    value={couponForm.usageLimit}
                    onChange={(e) => setCouponForm({ ...couponForm, usageLimit: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Per User Limit</label>
                  <input
                    type="text"
                    value={couponForm.perUserLimit}
                    onChange={(e) => setCouponForm({ ...couponForm, perUserLimit: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <input
                    type="date"
                    value={couponForm.validFrom}
                    onChange={(e) => setCouponForm({ ...couponForm, validFrom: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid To</label>
                  <input
                    type="date"
                    value={couponForm.validTo}
                    onChange={(e) => setCouponForm({ ...couponForm, validTo: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                  <select
                    value={couponForm.appliesTo}
                    onChange={(e) => setCouponForm({ ...couponForm, appliesTo: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  >
                    <option>All Products</option>
                    <option>Specific Category</option>
                    <option>Specific Product</option>
                  </select>
                </div>
                {couponForm.appliesTo === 'Specific Category' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Kitchen</option>
                    </select>
                  </div>
                )}
                {couponForm.appliesTo === 'Specific Product' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Product</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Search by product name..."
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveCoupon}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
