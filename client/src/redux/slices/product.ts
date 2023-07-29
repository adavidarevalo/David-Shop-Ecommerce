/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../components/product_card';

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
  reviewSend: boolean;
}

export const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload || true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.products = payload.data;
      state.error = null;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.products = [];
    },
  },
});

export const { setLoading, setProducts, setProduct, setError, resetError, productReviewed } = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state: any) => state.products;

