import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  getOrders,
  getUsersData,
  orderDelete,
  resetError,
  setError,
  setLoading,
  setUpdateDelivered,
  userDelete,
  getReport as getReportSlice,
} from '../slices/admin';
import { removedReview, setDeleteProduct, setProducts, setUpdateProduct } from '../slices/product';
import { AppState } from '../store';
import { NewProduct } from '../../types/product';

export const getAllUsers = () => async (dispatch: Dispatch, getState: () => AppState) => {
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
    const { data } = await axios.get('api/user', config);
    dispatch(getUsersData(data.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Users could not be fetched.';
      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const deleteUser = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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
    await axios.delete(`api/user/${id}`, config);
    dispatch(userDelete(id));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Users could not be fetched.';
      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const resetErrorAndRemoval = () => async (dispatch: Dispatch) => {
  dispatch(resetError());
};

export const getAllOrders = () => async (dispatch: Dispatch, getState: () => AppState) => {
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
    const { data } = await axios.get('api/orders', config);
    dispatch(getOrders(data.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Order could not be fetched.';
      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const deleteOrder = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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
    await axios.delete(`api/orders/${id}`, config);
    dispatch(orderDelete(id));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Order could not be deleted.';
      dispatch(setError(errorMessage));
    } else {
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      dispatch(setError(errorMessage));
    }
  }
};

export const setDelivered =
  (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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
      await axios.put(`api/orders/${id}`, {}, config);
      dispatch(setUpdateDelivered(id));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Order could not be updated.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const updateProduct =
  (
    brand: string,
    name: string,
    category: string,
    stock: number,
    price: number,
    image: string,
    productIsNew: boolean,
    description: string,
    _id: string
  ) =>
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
      const { data } = await axios.put(
        `api/products`,
        { brand, name, category, stock, price, image, productIsNew, description, _id },
        config
      );
      dispatch(setUpdateProduct(data.data));
      dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Product could not be updated.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const deleteProduct =
  (_id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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
      await axios.delete(`api/products/${_id}`, config);
      dispatch(setDeleteProduct(_id));
      dispatch(resetError());
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Product could not be deleted.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const createProduct =
  (newProduct: NewProduct) => async (dispatch: Dispatch, getState: () => AppState) => {
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
      const { data } = await axios.post(`api/products`, newProduct, config);
      dispatch(setProducts(data.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Product could not be updated.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const removeReview =
  (productId: string, reviewId: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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

      await axios.put(`api/products/${productId}/${reviewId}`, {}, config);
      dispatch(removedReview({ productId, reviewId }));
      dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Review could not be remove.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };

export const getReport =
  (from: string, to: string, type: string) =>
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

      const { data } = await axios.post(`api/report`, { from, to, type }, config);
      dispatch(getReportSlice(data.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Review could not be remove.';
        dispatch(setError(errorMessage));
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again later.';
        dispatch(setError(errorMessage));
      }
    }
  };
