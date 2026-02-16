'use client'
import AdminLayout from '@/components/AdminLayout'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { IoArrowUpOutline, IoTrendingUpOutline, IoWalletOutline, IoSearchOutline } from 'react-icons/io5'
import { BiDollarCircle, BiTargetLock } from 'react-icons/bi'
import { HiOutlineUsers, HiOutlineBell } from 'react-icons/hi'
import { AiOutlineBarChart, AiOutlineSetting } from 'react-icons/ai'
import { kpis, salesData, products, recentOrders, lowStock } from '../../Index/data'

const iconMap = [BiDollarCircle, HiOutlineUsers, BiTargetLock, IoWalletOutline]
const bgColors = ['bg-gradient-to-br from-lime-300 to-lime-400', 'bg-white', 'bg-white', 'bg-white']

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">See all your business information here</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">2 New</button>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><IoSearchOutline size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><HiOutlineBell size={20} /></button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-xs text-gray-500">Welcome back</p>
              <p className="text-sm font-semibold">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[i]
          return (
            <div key={i} className={`${bgColors[i]} p-6 rounded-2xl shadow-sm relative overflow-hidden`}>
              <div className="flex justify-between items-start mb-8">
                <Icon size={32} className="text-gray-700" />
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <IoArrowUpOutline size={20} />
                </button>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{kpi.value}</h2>
                <p className="text-sm text-gray-600 mt-1">{kpi.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AiOutlineBarChart size={20} />
              <h3 className="font-semibold text-lg">Sales Statistics</h3>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium px-4 py-2 bg-gray-100 rounded-lg">Monthly</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg"><AiOutlineSetting size={18} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Current Period</p>
              <h3 className="text-4xl font-bold mb-1">₹{salesData.reduce((a,b) => a + b.current, 0).toLocaleString()}</h3>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <IoTrendingUpOutline size={14} /> 12% vs Last Period
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Previous Period</p>
              <h3 className="text-4xl font-bold mb-1">₹{salesData.reduce((a,b) => a + b.previous, 0).toLocaleString()}</h3>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <IoTrendingUpOutline size={14} /> Comparison
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="current" fill="#d4ff00" radius={[8, 8, 0, 0]} />
              <Bar dataKey="previous" fill="#8ab4f8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <HiOutlineUsers size={20} />
              <h3 className="font-semibold text-lg">Top Products</h3>
            </div>
          </div>

          <div className="relative flex justify-center items-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={products.map((p, i) => ({ name: p.name, value: p.sales }))} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                  {products.map((_, i) => (
                    <Cell key={i} fill={['#d4ff00', '#8ab4f8', '#e8eaed'][i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold">{products[0].sales}</p>
                <p className="text-sm text-gray-500">Top Sales</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {products.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{p.name}</span>
                  <span className="font-semibold">{p.sales} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${(p.sales / 120) * 100}%`, backgroundColor: ['#d4ff00', '#8ab4f8', '#e8eaed'][i] }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
