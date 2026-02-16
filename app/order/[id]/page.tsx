'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { orderData } from '../../../Index/data'
import Link from 'next/link'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = decodeURIComponent(params.id)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [adminNotes, setAdminNotes] = useState('')



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
        <Link href="/order/%231001" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
          ← Back to Orders
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-gray-500 text-sm">View and manage order information</p>
      </div>

      {/* Order Summary Bar */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Order ID</p>
            <p className="font-semibold text-blue-600">{orderData.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Order Date</p>
            <p className="font-semibold">{orderData.date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Customer Name</p>
            <p className="font-semibold">{orderData.customer}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Total Amount</p>
            <p className="font-semibold text-lg">{orderData.total}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Payment Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadge(orderData.paymentStatus)}`}>
              {orderData.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Fulfillment Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFulfillmentBadge(orderData.fulfillmentStatus)}`}>
              {orderData.fulfillmentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Customer Name</p>
                  <p className="font-medium">{orderData.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{orderData.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{orderData.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Billing Address</p>
                  <p className="font-medium">{orderData.billingAddress}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Shipping Address</p>
                  <p className="font-medium">{orderData.shippingAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-2 px-3">Product Name</th>
                    <th className="text-left py-2 px-3">Variant</th>
                    <th className="text-left py-2 px-3">Price</th>
                    <th className="text-left py-2 px-3">Quantity</th>
                    <th className="text-left py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-3">{item.name}</td>
                      <td className="py-3 px-3 text-gray-600">{item.variant}</td>
                      <td className="py-3 px-3">{item.price}</td>
                      <td className="py-3 px-3">{item.qty}</td>
                      <td className="py-3 px-3 font-semibold">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{orderData.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{orderData.tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Charge</span>
                <span>{orderData.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">{orderData.discount}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold text-base">Grand Total</span>
                <span className="font-bold text-lg">{orderData.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment Transaction Logs */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Payment Transaction</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="font-medium">{orderData.payment.method}</p>
              </div>
              <div>
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-medium">{orderData.payment.transactionId}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Status</p>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {orderData.payment.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Payment Date</p>
                <p className="font-medium">{orderData.payment.date}</p>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Shipment Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Courier Name</p>
                <p className="font-medium">{orderData.shipment.courier}</p>
              </div>
              <div>
                <p className="text-gray-500">AWB / Tracking Number</p>
                <p className="font-medium">{orderData.shipment.awb}</p>
              </div>
              <div>
                <p className="text-gray-500">Tracking URL</p>
                <a href={orderData.shipment.trackingUrl} target="_blank" className="text-blue-600 hover:underline">
                  Track Shipment
                </a>
              </div>
              <div>
                <p className="text-gray-500">Dispatch Date</p>
                <p className="font-medium">{orderData.shipment.dispatchDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Expected Delivery</p>
                <p className="font-medium">{orderData.shipment.expectedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Order Status Timeline</h2>
            <div className="space-y-4">
              {orderData.timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {i < orderData.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-300 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className={`font-medium text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.status}
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                <select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this order..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-4">Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700">
                Refund / Void Payment
              </button>
              <button className="w-full bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700">
                Cancel Order
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200">
                Print Invoice
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200">
                Download Invoice (PDF)
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200">
                Send Tracking Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
