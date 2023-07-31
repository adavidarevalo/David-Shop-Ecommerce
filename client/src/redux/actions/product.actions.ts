import { Dispatch } from '@reduxjs/toolkit';
import {
  setError,
  setLoading,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
} from '../slices/product';
import axios from 'axios';
import { AppState } from '../store';

export const getProducts = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await axios.get('/api/products');
    dispatch(setProducts(data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        'An unexpected error occurred. Please try again later.';

      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const getProduct = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        'An unexpected error occurred. Please try again later.';

      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const createProductReview =
  (productId: string, userId: string, comment: string, rating: number, title: string) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(setLoading(true));
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await axios.post(
        `/api/products/reviews/${productId}`,
        { comment, userId, rating, title },
        config
      );
      dispatch(productReviewed());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          'An unexpected error occurred. Please try again later.';

        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const resetProductError = () => async (dispatch: Dispatch) => {
  dispatch(resetError());
};
