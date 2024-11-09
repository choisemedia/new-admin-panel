import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockProducts, mockCategories, mockCustomers, mockOrders } from '../../utils/mockData';
import { setProducts } from './productsSlice';
import { setCategories } from './categoriesSlice';
import { setCustomers } from './customersSlice';
import { setOrders } from './ordersSlice';

export const initializeData = createAsyncThunk(
  'app/initializeData',
  async (_, { dispatch }) => {
    // In a real application, these would be API calls
    dispatch(setProducts(mockProducts));
    dispatch(setCategories(mockCategories));
    dispatch(setCustomers(mockCustomers));
    dispatch(setOrders(mockOrders));
  }
);