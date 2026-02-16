'use client'
import AdminLayout from '@/components/AdminLayout'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { kpis, salesData, products, recentOrders, lowStock } from '../../Index/data'
export default function Dashboard() {


  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500 text-sm">{kpi.title}</p>
            <h2 className="text-2xl font-bold">{kpi.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Sales Chart</h3>
            <select className="text-sm border border-gray-300 rounded px-3 py-1 bg-white">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={224}>
            <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
              <YAxis hide />
              <Tooltip formatter={(v) => `₹${(v as number).toLocaleString()}`} />
              <Line type="natural" dataKey="current" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="natural" dataKey="previous" stroke="#ef4444" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

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
              {recentOrders.map((o, i) => (
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
