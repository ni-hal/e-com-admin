export const categoriesData = [
     { id: 1, nameEn: 'Electronics', nameAr: 'إلكترونيات', parentId: null, sortOrder: 1, status: 'Active', slug: 'electronics', metaTitle: '', metaDesc: '', banner: '' },
        { id: 2, nameEn: 'Mobiles', nameAr: 'الهواتف المحمولة', parentId: 1, sortOrder: 1, status: 'Active', slug: 'mobiles', metaTitle: '', metaDesc: '', banner: '' },
        { id: 3, nameEn: 'Laptops', nameAr: 'أجهزة الكمبيوتر المحمولة', parentId: 1, sortOrder: 2, status: 'Active', slug: 'laptops', metaTitle: '', metaDesc: '', banner: '' },
        { id: 4, nameEn: 'Fashion', nameAr: 'أزياء', parentId: null, sortOrder: 2, status: 'Active', slug: 'fashion', metaTitle: '', metaDesc: '', banner: '' },
        { id: 5, nameEn: 'Men', nameAr: 'رجال', parentId: 4, sortOrder: 1, status: 'Active', slug: 'men', metaTitle: '', metaDesc: '', banner: '' },
        { id: 6, nameEn: 'Women', nameAr: 'نساء', parentId: 4, sortOrder: 2, status: 'Active', slug: 'women', metaTitle: '', metaDesc: '', banner: '' },
]

  export const customerData = {
    1: {
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      totalOrders: 5,
      totalSpent: '₹4,250',
      customerSince: '15 Jan 2025',
      billingAddress: {
        street: '123, MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zip: '560001'
      },
      shippingAddress: {
        street: '123, MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zip: '560001'
      },
      orders: [
        { id: '#1001', date: '10 Feb 2026', amount: '₹1,200', paymentStatus: 'Paid', orderStatus: 'Delivered' },
        { id: '#1005', date: '02 Feb 2026', amount: '₹650', paymentStatus: 'Paid', orderStatus: 'Shipped' },
        { id: '#998', date: '28 Jan 2026', amount: '₹1,500', paymentStatus: 'Paid', orderStatus: 'Delivered' },
        { id: '#985', date: '20 Jan 2026', amount: '₹900', paymentStatus: 'Paid', orderStatus: 'Delivered' }
      ]
    },
    2: {
      name: 'Anjali Nair',
      email: 'anjali@gmail.com',
      phone: '9123456780',
      totalOrders: 2,
      totalSpent: '₹1,850',
      customerSince: '01 Feb 2025',
      billingAddress: {
        street: '45, Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400002'
      },
      shippingAddress: {
        street: '45, Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400002'
      },
      orders: [
        { id: '#1008', date: '05 Feb 2026', amount: '₹1,100', paymentStatus: 'Paid', orderStatus: 'Delivered' },
        { id: '#1002', date: '03 Feb 2026', amount: '₹750', paymentStatus: 'Paid', orderStatus: 'Delivered' }
      ]
    }
  }

   export const customers = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@gmail.com',
        phone: '9876543210',
        ordersCount: 5,
        lastOrderDate: '10 Feb 2026',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Anjali Nair',
        email: 'anjali@gmail.com',
        phone: '9123456780',
        ordersCount: 2,
        lastOrderDate: '05 Feb 2026',
        status: 'Active'
      },
      {
        id: 3,
        name: 'Priya Verma',
        email: 'priya@gmail.com',
        phone: '9988776655',
        ordersCount: 8,
        lastOrderDate: '12 Feb 2026',
        status: 'Active'
      },
      {
        id: 4,
        name: 'Amit Kumar',
        email: 'amit@gmail.com',
        phone: '9876512340',
        ordersCount: 0,
        lastOrderDate: '-',
        status: 'Inactive'
      }
    ]


     export const kpis = [
        { title: 'Today Sales', value: '₹12,500' },
        { title: 'Total Orders', value: '320' },
        { title: 'Pending Orders', value: '18' },
        { title: 'Low Stock Items', value: '6' },
      ]
    
      export const recentOrders = [
        { id: '#1001', name: 'Rahul', amount: '₹1,200', status: 'Delivered' },
        { id: '#1002', name: 'Anjali', amount: '₹850', status: 'Pending' },
        { id: '#1003', name: 'Vikas', amount: '₹2,400', status: 'Shipped' },
        { id: '#1004', name: 'Sneha', amount: '₹650', status: 'Pending' },
      ]
    
     export const products = [
        { name: 'Wireless Mouse', sales: 120 },
        { name: 'Bluetooth Speaker', sales: 95 },
        { name: 'Laptop Bag', sales: 80 },
      ]
    
     export const lowStock = [
        { name: 'USB Cable', stock: 5 },
        { name: 'Power Bank', stock: 3 },
        { name: 'Headphones', stock: 4 },
      ]
    
      export const salesData = [
        { day: 'Jan', current: 12000, previous: 8000 },
        { day: 'Feb', current: 19000, previous: 15000 },
        { day: 'March', current: 15000, previous: 20000 },
        { day: 'April', current: 25000, previous: 18000 },
        { day: 'May', current: 22000, previous: 24000 },
        { day: 'June', current: 30000, previous: 28000 },
        { day: 'July', current: 28000, previous: 30000 },
      ]

   export     const orderData = {
    id: '#1001',
    date: '10 Feb 2026',
    customer: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    total: '₹1,200',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    billingAddress: '123 MG Road, Bangalore, Karnataka 560001',
    shippingAddress: '123 MG Road, Bangalore, Karnataka 560001',
    items: [
      { name: 'Wireless Mouse', variant: 'Black / Standard', price: '₹600', qty: 2, total: '₹1,200' }
    ],
    subtotal: '₹1,200',
    tax: '₹0',
    shipping: '₹0',
    discount: '₹0',
    grandTotal: '₹1,200',
    payment: {
      method: 'UPI',
      transactionId: 'TXN123456789',
      status: 'Success',
      date: '10 Feb 2026, 10:30 AM'
    },
    timeline: [
      { status: 'Order Placed', date: '10 Feb 2026, 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '10 Feb 2026, 10:31 AM', completed: true },
      { status: 'Processing', date: '10 Feb 2026, 11:00 AM', completed: true },
      { status: 'Shipped', date: '11 Feb 2026, 09:00 AM', completed: true },
      { status: 'Delivered', date: 'Expected: 13 Feb 2026', completed: false }
    ],
    shipment: {
      courier: 'BlueDart Express',
      awb: 'BD123456789IN',
      trackingUrl: 'https://bluedart.com/track/BD123456789IN',
      dispatchDate: '11 Feb 2026',
      expectedDelivery: '13 Feb 2026'
    }
  }

  export const orders = [
    { id: '#1001', date: '10 Feb 2026', customer: 'Rahul', amount: '₹1,200', paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', shippingMethod: 'Express' },
    { id: '#1002', date: '09 Feb 2026', customer: 'Anjali', amount: '₹850', paymentStatus: 'Unpaid', fulfillmentStatus: 'Pending', shippingMethod: 'Standard' },
    { id: '#1003', date: '09 Feb 2026', customer: 'Vikas', amount: '₹2,400', paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', shippingMethod: 'Express' },
    { id: '#1004', date: '08 Feb 2026', customer: 'Sneha', amount: '₹650', paymentStatus: 'Unpaid', fulfillmentStatus: 'Pending', shippingMethod: 'Standard' },
    { id: '#1005', date: '08 Feb 2026', customer: 'Priya', amount: '₹3,200', paymentStatus: 'Paid', fulfillmentStatus: 'Processing', shippingMethod: 'Express' },
    { id: '#1006', date: '07 Feb 2026', customer: 'Amit', amount: '₹1,500', paymentStatus: 'Refunded', fulfillmentStatus: 'Cancelled', shippingMethod: 'Pickup' },
    { id: '#1007', date: '07 Feb 2026', customer: 'Neha', amount: '₹980', paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', shippingMethod: 'Standard' },
    { id: '#1008', date: '06 Feb 2026', customer: 'Karan', amount: '₹4,100', paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', shippingMethod: 'Express' },
  ]

   export const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'variants', label: 'Variants', icon: '🎨' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'attributes', label: 'Attributes', icon: '🏷️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'labels', label: 'Labels', icon: '⭐' },
    { id: 'visibility', label: 'Visibility', icon: '👁️' },
  ]

   export const validationResults = {
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

  export const promotions = [    { id: 1, code: 'SAVE10', type: 'Percentage', value: '10%', minCart: '₹500', usage: 25, validFrom: '01 Feb 2026', validTo: '28 Feb 2026', status: 'Active' },
      { id: 2, code: 'FLAT100', type: 'Fixed', value: '₹100', minCart: '₹1000', usage: 10, validFrom: '01 Feb 2026', validTo: '10 Feb 2026', status: 'Expired' },
      { id: 3, code: 'WELCOME50', type: 'Fixed', value: '₹50', minCart: '₹300', usage: 50, validFrom: '01 Jan 2026', validTo: '31 Dec 2026', status: 'Active' },
      { id: 4, code: 'MEGA20', type: 'Percentage', value: '20%', minCart: '₹2000', usage: 5, validFrom: '15 Feb 2026', validTo: '20 Feb 2026', status: 'Disabled' }]

      export const bannersData = [
        { id: 1, title: 'Summer Sale Banner', image: '/banner1.jpg', url: '/sale/summer', startDate: '01 Mar 2026', endDate: '15 Mar 2026', status: 'Active' },
        { id: 2, title: 'Festival Offer Banner', image: '/banner2.jpg', url: '/sale/festival', startDate: '10 Feb 2026', endDate: '28 Feb 2026', status: 'Active' },
      ]