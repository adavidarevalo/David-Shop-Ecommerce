import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
  reviewSend: boolean;
  productUpdate: boolean;
  reviewRemoval: boolean;
}

export const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
  productUpdate: false,
  reviewRemoval: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload ?? true;
    },
    setProducts: (state, { payload }: PayloadAction<{ data: Product[] }>) => {
      state.loading = false;
      state.products = payload.data;
      state.error = null;
    },
    setProduct: (state, { payload }: PayloadAction<Product>) => {
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
      state.productUpdate = false;
      state.reviewRemoval = false;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
      state.products = [];
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.error = null;
      state.loading = false;
    },
    setReviewRemovalFlag: (state) => {
      state.error = null;
      state.loading = false;
      state.reviewRemoval = true;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setProduct,
  setError,
  resetError,
  productReviewed,
  setProductUpdateFlag,
  setReviewRemovalFlag,
} = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state: ProductState) => state.products;
