import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { deleteReview } from '../../utils/delete_review';

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
  reviewSend: boolean;
  reviewRemoval: boolean;
}

export const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
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
    setUpdateProduct: (state, { payload }: PayloadAction<Product>) => {
      state.loading = false;
      state.error = null;
      state.products = state.products.map((product) => {
        if (product._id === payload._id) {
          return payload;
        }
        return product;
      });
    },
    setDeleteProduct: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = state.products.filter((product) => product._id !== payload);
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
      state.reviewRemoval = false;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
      state.products = [];
    },
    setReviewRemovalFlag: (state) => {
      state.error = null;
      state.loading = false;
      state.reviewRemoval = true;
    },
    removedReview: (state, { payload }) => {
      state.products = deleteReview(payload.productId, payload.reviewId, state.products);
      state.error = null;
      state.loading = false;
    },
    deleteProductReviewAction: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.product = deleteReview(payload.productId, payload.reviewId, [
        state?.product as Product,
      ])[0];
    },
    updateProductReviewAction: (state, { payload }) => {
      const reviews = (state.product?.reviews || []).map((review) => {
        if (review._id === payload.reviewId) {
          review.rating = payload.review.rating || review.rating;
          review.comment = payload.review.comment || review.comment;
          review.title = payload.review.title || review.title;
        }
        return review;
      });
      state.error = null;
      state.loading = false;
      if (state.product) {
        state.product = {
          ...state.product,
          reviews,
        };
      }
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
  setReviewRemovalFlag,
  setDeleteProduct,
  removedReview,
  setUpdateProduct,
  deleteProductReviewAction,
  updateProductReviewAction,
} = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state: ProductState) => state.products;
