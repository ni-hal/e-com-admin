'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import { orders } from '../../Index/data'
import { IoSearchOutline, IoCloseOutline, IoEllipsisHorizontal } from 'react-icons/io5'
import { HiOutlineMail, HiOutlinePhone, HiOutlineChat } from 'react-icons/hi'
import { BsBox } from 'react-icons/bs'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0])
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [filters, setFilters] = useState({ status: 'Any status', price: '$100-$500' })

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    )
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Paid: 'bg-yellow-100 text-yellow-700',
      Delivered: 'bg-orange-100 text-orange-700',
      Completed: 'bg-green-100 text-green-700'
    }
    return colors[status] || 'bg-yellow-100 text-yellow-700'
  }

  return (
    <AdminLayout>
      <div className="flex gap-6 h-[calc(100vh-120px)]">
        {/* Orders List */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="flex gap-3 mb-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Any status</option>
                <option>Paid</option>
                <option>Delivered</option>
                <option>Completed</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>$100-$500</option>
                <option>$500-$1000</option>
                <option>$1000+</option>
              </select>
              <div className="flex-1"></div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Sort by Date</button>
            </div>
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left border-b">
                  <th className="px-4 py-3 w-12">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600">Order</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelectOrder(order.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                    <td className="px-4 py-3">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <IoEllipsisHorizontal size={18} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selectedOrder && (
          <div className="w-96 bg-white rounded-2xl shadow-sm p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Order {selectedOrder.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                  <span className="text-sm text-gray-500">{selectedOrder.date}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <IoCloseOutline size={24} />
              </button>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {selectedOrder.customer.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedOrder.customer}</h3>
                  <p className="text-sm text-gray-500">customer@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <HiOutlineMail size={18} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <HiOutlinePhone size={18} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <HiOutlineChat size={18} />
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <BsBox size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">FLEX ONE drill/driver</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedOrder.amount}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <BsBox size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Socket Systems Electric</p>
                    <p className="text-xs text-gray-500 mt-1">₹280.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">{selectedOrder.amount}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  <span className="text-sm font-medium">Track</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500">
                  <span className="text-sm font-medium">Refund</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
