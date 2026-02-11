'use client'
import AdminLayout from '@/components/AdminLayout'

export default function Dashboard() {
  // Static Data
  const kpis = [
    { title: 'Today Sales', value: '₹12,500' },
    { title: 'Total Orders', value: '320' },
    { title: 'Pending Orders', value: '18' },
    { title: 'Low Stock Items', value: '6' },
  ]

  const orders = [
    { id: '#1001', name: 'Rahul', amount: '₹1,200', status: 'Delivered' },
    { id: '#1002', name: 'Anjali', amount: '₹850', status: 'Pending' },
    { id: '#1003', name: 'Vikas', amount: '₹2,400', status: 'Shipped' },
    { id: '#1004', name: 'Sneha', amount: '₹650', status: 'Pending' },
  ]

  const products = [
    { name: 'Wireless Mouse', sales: 120 },
    { name: 'Bluetooth Speaker', sales: 95 },
    { name: 'Laptop Bag', sales: 80 },
  ]

  const lowStock = [
    { name: 'USB Cable', stock: 5 },
    { name: 'Power Bank', stock: 3 },
    { name: 'Headphones', stock: 4 },
  ]

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500 text-sm">{kpi.title}</p>
            <h2 className="text-2xl font-bold">{kpi.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Chart */}
        <div className="bg-white p-5 rounded-lg shadow lg:col-span-2">
          <h3 className="font-semibold mb-4">Sales Chart</h3>
          <div className="h-56 bg-gray-100 flex items-center justify-center rounded">
            Static Chart Placeholder
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Top Products</h3>
          <ul className="space-y-2">
            {products.map((p, i) => (
              <li key={i} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-gray-500">{p.sales}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-5 rounded-lg shadow lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${
                      o.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Stock Alerts</h3>
          <ul className="space-y-2">
            {lowStock.map((item, i) => (
              <li key={i} className="text-red-600 flex justify-between">
                <span>{item.name}</span>
                <span>{item.stock} left</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </AdminLayout>
  )
}
