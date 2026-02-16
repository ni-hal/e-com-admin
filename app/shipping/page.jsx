'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function ShippingSettingsPage() {
  const [shippingType, setShippingType] = useState('flat')
  const [cityRates, setCityRates] = useState([
    { id: 1, city: 'Dubai', charge: 15 },
    { id: 2, city: 'Abu Dhabi', charge: 20 }
  ])
  const [distanceRules, setDistanceRules] = useState([
    { id: 1, minDistance: 0, maxDistance: 10, charge: 10 },
    { id: 2, minDistance: 11, maxDistance: 50, charge: 25 }
  ])
  const [zones, setZones] = useState([
    { id: 1, name: 'Zone 1', countries: 'UAE, Oman', charge: 10, deliveryDays: '5-7 days' },
    { id: 2, name: 'Zone 2', countries: 'USA, Canada', charge: 20, deliveryDays: '7-10 days' }
  ])
  const [couriers, setCouriers] = useState({
    dhl: { enabled: true, apiKey: '', apiSecret: '', services: ['standard', 'express'] },
    aramex: { enabled: false, apiKey: '', apiSecret: '', services: ['standard'] },
    fedex: { enabled: true, apiKey: '', apiSecret: '', services: ['standard', 'express', 'sameday'] }
  })

  const toggleCourier = (courier) => {
    setCouriers(prev => ({
      ...prev,
      [courier]: { ...prev[courier], enabled: !prev[courier].enabled }
    }))
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shipping Settings</h1>
          <p className="text-gray-600 mt-1">Configure delivery rules and courier integrations</p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Local Shipping */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Local Shipping</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rule Setup</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shippingType"
                      value="flat"
                      checked={shippingType === 'flat'}
                      onChange={(e) => setShippingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Flat Rate</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shippingType"
                      value="city"
                      checked={shippingType === 'city'}
                      onChange={(e) => setShippingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">City-wise Rate</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shippingType"
                      value="distance"
                      checked={shippingType === 'distance'}
                      onChange={(e) => setShippingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Distance-based Rate</span>
                  </label>
                </div>
              </div>

              {shippingType === 'flat' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Charge
                  </label>
                  <input
                    type="number"
                    placeholder="Enter flat rate"
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {shippingType === 'city' && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter city name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charge
                      </label>
                      <input
                        type="number"
                        placeholder="Enter charge"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Add City Rate
                  </button>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">City</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Charge</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cityRates.map((rate) => (
                          <tr key={rate.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{rate.city}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">${rate.charge}</td>
                            <td className="px-4 py-2 text-sm">
                              <button className="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {shippingType === 'distance' && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Distance (km)
                      </label>
                      <input
                        type="number"
                        placeholder="Min distance"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Distance (km)
                      </label>
                      <input
                        type="number"
                        placeholder="Max distance"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charge
                      </label>
                      <input
                        type="number"
                        placeholder="Enter charge"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Add Distance Rule
                  </button>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Min Distance</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Max Distance</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Charge</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {distanceRules.map((rule) => (
                          <tr key={rule.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{rule.minDistance} km</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{rule.maxDistance} km</td>
                            <td className="px-4 py-2 text-sm text-gray-900">${rule.charge}</td>
                            <td className="px-4 py-2 text-sm">
                              <button className="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery Days
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Template
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Delivered in 2-4 business days"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: International Shipping */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">International Shipping</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Country Zones</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zone Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Zone 1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Countries
                      </label>
                      <select
                        multiple
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>UAE</option>
                        <option>Oman</option>
                        <option>USA</option>
                        <option>Canada</option>
                        <option>UK</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Charge
                      </label>
                      <input
                        type="number"
                        placeholder="Enter charge"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Delivery Days
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 5-7 days"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Add Zone
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Zone Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Countries</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Charge</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Delivery Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {zones.map((zone) => (
                      <tr key={zone.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{zone.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{zone.countries}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${zone.charge}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{zone.deliveryDays}</td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Courier Integration */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Courier Integration</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(couriers).map(([key, courier]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 uppercase">{key}</h3>
                      <button
                        onClick={() => toggleCourier(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          courier.enabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            courier.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    {courier.enabled && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            API Key
                          </label>
                          <input
                            type="text"
                            placeholder="Enter API key"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            API Secret
                          </label>
                          <input
                            type="password"
                            placeholder="Enter API secret"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Types
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={courier.services.includes('standard')}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">Standard</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={courier.services.includes('express')}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">Express</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={courier.services.includes('sameday')}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">Same Day</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Global Settings */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Global Settings</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Minimum Order Amount
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Handling Time (days)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Save Settings
                </button>
                <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
