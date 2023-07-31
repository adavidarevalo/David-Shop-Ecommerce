import { Dispatch } from '@reduxjs/toolkit';
import {
  setError,
  setLoading,
  cartItemAdd,
  removeItem,
  clearCart,
  setExpressShipping,
} from '../slices/cart';
import axios, { AxiosError } from 'axios';

export const addCartItem = (id: string, qty: number) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: { data },
    } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      _id: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description,
      stock: data.stock,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    if (error instanceof AxiosError) {
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

export const removeCartItem = (id: string) => (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(removeItem(id));
};

export const setExpress = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearCart());
};
