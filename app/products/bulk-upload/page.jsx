'use client'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function BulkUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const validationResults = {
    totalRows: 150,
    validRows: 142,
    errorRows: 8,
    errors: [
      { row: 5, productName: 'Wireless Mouse', field: 'Product Name', error: 'Product name already exists' },
      { row: 12, productName: '', field: 'Product Name', error: 'Product name is required' },
      { row: 23, productName: 'Gaming Keyboard', field: 'Price', error: 'Invalid price format' },
      { row: 34, productName: 'USB Cable', field: 'Price', error: 'Price must be greater than 0' },
      { row: 45, productName: 'Laptop Stand', field: 'Stock', error: 'Stock cannot be negative' },
      { row: 67, productName: 'Monitor Arm', field: 'Category', error: 'Category does not exist' },
      { row: 89, productName: 'Desk Lamp', field: 'SKU', error: 'SKU already exists' },
      { row: 103, productName: 'Phone Holder', field: 'Stock', error: 'Stock must be a valid number' },
    ]
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      setShowResults(true)
    }
  }

  const handleReupload = () => {
    setSelectedFile(null)
    setShowResults(false)
  }

  const downloadTemplate = (type) => {
    alert(`Downloading ${type} template...`)
  }

  const downloadErrorReport = () => {
    alert('Downloading error report...')
  }

  const importValidRecords = () => {
    alert('Importing 142 valid records...')
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bulk Upload Products</h1>
          <p className="text-gray-600 mt-2">Upload products using CSV or Excel template</p>
        </div>

        {/* Template Download Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Download Template</h2>
          <div className="flex gap-4 mb-3">
            <button
              onClick={() => downloadTemplate('CSV')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Download CSV Template
            </button>
            <button
              onClick={() => downloadTemplate('Excel')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download Excel Template
            </button>
          </div>
          <p className="text-sm text-gray-500">
            ⚠️ Follow the format exactly to avoid validation errors
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. Upload File</h2>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              id="fileInput"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  Click to upload
                </label>
                <span className="text-gray-600"> or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">CSV or XLSX files only</p>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Upload and Validate
          </button>
        </div>

        {/* Validation Results */}
        {showResults && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">3. Validation Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Rows</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{validationResults.totalRows}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Valid Rows</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{validationResults.validRows}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">Error Rows</p>
                  <p className="text-3xl font-bold text-red-900 mt-1">{validationResults.errorRows}</p>
                </div>
              </div>
            </div>

            {/* Error Report Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">4. Error Report</h2>
              <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Row Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Error Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {validationResults.errors.map((error, index) => (
                      <tr key={index} className="bg-red-50 hover:bg-red-100 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {error.row}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {error.productName || <span className="text-gray-400 italic">Empty</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {error.field}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600 font-medium">
                          {error.error}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">5. Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={downloadErrorReport}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Download Error Report
                </button>
                <button
                  onClick={handleReupload}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Re-upload File
                </button>
                <button
                  onClick={importValidRecords}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Import Valid Records ({validationResults.validRows})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
