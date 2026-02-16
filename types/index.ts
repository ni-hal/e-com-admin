export interface Category {
  id: number;
  name: string;
  nameEn?: string;
  nameAr?: string;
  parentId?: number | null;
  sortOrder?: number;
  status: 'Active' | 'Inactive';
  updated?: string;
  slug?: string;
  metaTitle?: string;
  metaDesc?: string;
  banner?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'Active' | 'Disabled';
  label?: string;
  updated: string;
  shortDesc?: string;
  sku?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  amount: string;
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  fulfillmentStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingMethod: string;
}

export interface Coupon {
  id: number;
  code: string;
  type: 'Percentage' | 'Fixed';
  value: string;
  minCart: string;
  usage: number;
  validFrom: string;
  validTo: string;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  url: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive';
}
