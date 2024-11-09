import { v4 as uuidv4 } from 'uuid';
import { Product, Category, Customer, Order } from '../types';

const now = new Date().toISOString();

// Mock Categories
export const mockCategories: Category[] = [
  { id: uuidv4(), name: 'Electronics', description: 'Electronic devices and accessories', order: 1 },
  { id: uuidv4(), name: 'Clothing', description: 'Fashion and apparel', order: 2 },
  { id: uuidv4(), name: 'Books', description: 'Books and literature', order: 3 }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Smartphone',
    price: 599,
    image: 'https://picsum.photos/400/400',
    category: mockCategories[0].id,
    description: 'Latest model smartphone with advanced features',
    inStock: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuidv4(),
    name: 'T-Shirt',
    price: 29,
    image: 'https://picsum.photos/400/400',
    category: mockCategories[1].id,
    description: 'Comfortable cotton t-shirt',
    inStock: true,
    createdAt: now,
    updatedAt: now
  }
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@example.com',
    username: '@johndoe',
    contactNumber: '+1234567890',
    location: 'New York',
    createdAt: now,
    lastActive: now
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: uuidv4(),
    customerId: mockCustomers[0].id,
    products: [{ 
      productId: mockProducts[0].id,
      quantity: 1,
      price: mockProducts[0].price
    }],
    status: 'pending',
    totalAmount: 599,
    createdAt: now,
    updatedAt: now,
    paymentStatus: 'pending'
  }
];