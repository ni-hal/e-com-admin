'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    orderStatus: '',
    paymentStatus: '',
    shippingMethod: '',
    search: ''
  })
  const [selectedOrders, setSelectedOrders] = useState([])

  const orders = [
    { id: '#1001', date: '10 Feb 2026', customer: 'Rahul', amount: '₹1,200', paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', shippingMethod: 'Express' },
    { id: '#1002', date: '09 Feb 2026', customer: 'Anjali', amount: '₹850', paymentStatus: 'Unpaid', fulfillmentStatus: 'Pending', shippingMethod: 'Standard' },
    { id: '#1003', date: '09 Feb 2026', customer: 'Vikas', amount: '₹2,400', paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', shippingMethod: 'Express' },
    { id: '#1004', date: '08 Feb 2026', customer: 'Sneha', amount: '₹650', paymentStatus: 'Unpaid', fulfillmentStatus: 'Pending', shippingMethod: 'Standard' },
    { id: '#1005', date: '08 Feb 2026', customer: 'Priya', amount: '₹3,200', paymentStatus: 'Paid', fulfillmentStatus: 'Processing', shippingMethod: 'Express' },
    { id: '#1006', date: '07 Feb 2026', customer: 'Amit', amount: '₹1,500', paymentStatus: 'Refunded', fulfillmentStatus: 'Cancelled', shippingMethod: 'Pickup' },
    { id: '#1007', date: '07 Feb 2026', customer: 'Neha', amount: '₹980', paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', shippingMethod: 'Standard' },
    { id: '#1008', date: '06 Feb 2026', customer: 'Karan', amount: '₹4,100', paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', shippingMethod: 'Express' },
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters({ dateFrom: '', dateTo: '', orderStatus: '', paymentStatus: '', shippingMethod: '', search: '' })
  }

  const toggleSelectAll = () => {
    setSelectedOrders(selectedOrders.length === orders.length ? [] : orders.map(o => o.id))
  }

  const toggleSelectOrder = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    )
  }

  const getPaymentBadge = (status) => {
    const styles = {
      Paid: 'bg-green-100 text-green-700',
      Unpaid: 'bg-yellow-100 text-yellow-700',
      Refunded: 'bg-gray-100 text-gray-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  const getFulfillmentBadge = (status) => {
    const styles = {
      Delivered: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Cancelled: 'bg-red-100 text-red-700',
      Shipped: 'bg-blue-100 text-blue-700',
      Processing: 'bg-purple-100 text-purple-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-500 text-sm">Manage customer orders</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select
              value={filters.orderStatus}
              onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
            <select
              value={filters.shippingMethod}
              onChange={(e) => handleFilterChange('shippingMethod', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">All</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Order ID or Customer Name"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4 flex items-center gap-4">
          <span className="text-sm font-medium text-blue-900">
            {selectedOrders.length} order(s) selected
          </span>
          <select className="border border-blue-300 rounded px-3 py-1.5 text-sm bg-white">
            <option value="">Bulk Update Status</option>
            <option value="Processing">Mark as Processing</option>
            <option value="Shipped">Mark as Shipped</option>
            <option value="Delivered">Mark as Delivered</option>
            <option value="Cancelled">Mark as Cancelled</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700">
            Apply
          </button>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Payment Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fulfillment Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Shipping Method</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    <Link href={`/admin/order/${encodeURIComponent(order.id)}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 text-gray-900">{order.customer}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadge(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFulfillmentBadge(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.shippingMethod}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/order/${encodeURIComponent(order.id)}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        title="View Order"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                        title="Update Status"
                      >
                        <option value="">Update</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        title="Print Invoice"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        title="Export"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
