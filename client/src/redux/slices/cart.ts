/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../components/product_card';
import { calculateSubtotal } from '../../utils/calculate_subtotal';
import { getLocalStorageCart, getLocalStorageSubtotal, updateLocalStorage } from '../../utils/store';

export interface CartState {
  loading: boolean;
  error: string | null;
  cart: Product[];
  expressShipping: boolean;
  subtotal: number;
}

export const initialState: CartState = {
  loading: false,
  error: null,
  cart: getLocalStorageCart(),
  expressShipping: (JSON.parse(localStorage.getItem('expressShipping') || 'false')),
  subtotal: getLocalStorageSubtotal(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload || true;
    },
    cartItemAdd: (state, { payload }) => {
      const existItem = state.cart.find((item) => item._id === payload._id);

      if (existItem) {
        state.cart = state.cart.map((item) => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    removeItem: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item._id !== payload);

      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
      state.cart = [];
    },
    clearCart: (state) => {
      localStorage.removeItem('cartItems');
      state.loading = false;
      state.error = null;
      state.cart = [];
    },
    setExpressShipping: (state, { payload }) => {
      state.expressShipping = payload;
      localStorage.setItem('expressShipping', JSON.stringify(payload));
      state.loading = false;
      state.error = null;
    }
  },
});

export const { setLoading, cartItemAdd, setError, removeItem, clearCart, setExpressShipping } = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state: any) => state.cart;
