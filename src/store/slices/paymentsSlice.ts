import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentMethod } from '../../types';

interface PaymentsState {
  methods: PaymentMethod[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  methods: [
    { id: 'cash', name: 'Cash Payment', type: 'cash', isActive: false },
    { id: 'telegram', name: 'Telegram Stars', type: 'virtual', isActive: true },
    { id: 'toncoin', name: 'Toncoin', type: 'crypto', isActive: true },
    { id: 'stripe', name: 'Stripe', type: 'fiat', isActive: false },
  ],
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    togglePaymentMethod: (state, action: PayloadAction<string>) => {
      const method = state.methods.find(m => m.id === action.payload);
      if (method) {
        method.isActive = !method.isActive;
      }
    },
    updatePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      const index = state.methods.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.methods[index] = action.payload;
      }
    },
  },
});

export const { togglePaymentMethod, updatePaymentMethod } = paymentsSlice.actions;
export default paymentsSlice.reducer;