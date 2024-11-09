export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  order: number;
}

export interface Customer {
  id: string;
  name?: string;
  contactNumber?: string;
  email?: string;
  username?: string;
  location?: string;
  comment?: string;
  telegramId?: string;
  orders?: string[];
  createdAt: string;
  lastActive?: string;
}

export interface Order {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
    variantId?: string;
    price: number;
  }>;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  deliveryAddress?: string;
  comment?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'virtual' | 'crypto' | 'fiat';
  isActive: boolean;
  config?: {
    apiKey?: string;
    merchantId?: string;
    wallet?: string;
  };
}

export interface Manager {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'support';
  permissions: string[];
  telegramId?: string;
  lastActive?: string;
}