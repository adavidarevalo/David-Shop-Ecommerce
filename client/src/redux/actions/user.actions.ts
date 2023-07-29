/** @format */

import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, userLogOut, userLogin, updateUserProfile, resetUpdate, setUserOrders } from '../slices/user';

export interface User {
  token: string;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createAt?: string;
}

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const {
      data,
    }: {
      data: {
        success: boolean;
        data: User;
        error: string;
      };
    } = await axios.post('/api/user/login', { email, password }, config);

    if (data.success) {
      dispatch(userLogin(data.data));
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again later.';

    dispatch(setError(errorMessage));
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogOut());
};

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const {
      data,
    }: {
      data: {
        success: boolean;
        data: User;
        error: string;
      };
    } = await axios.post('/api/user/register', { name, email, password }, config);
    dispatch(userLogin(data.data));
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again later.';

    dispatch(setError(errorMessage));
  }
};

export const updateProfile =
  (id: string, name: string, email: string, password: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true));
    const {
      user: { userInfo },
    } = getState();
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {
        data,
      }: {
        data: {
          success: boolean;
          data: User;
          error: string;
        };
      } = await axios.put(`/api/user/update/${id}`, { name, email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      dispatch(updateUserProfile(data.data));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again later.';

      dispatch(setError(errorMessage));
    }
  };

export const resetUpdateSuccess = () => async (dispatch: Dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch: Dispatch, getState: any) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/${userInfo._id}`, config);
    dispatch(setUserOrders(data.data));
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again later.';

    dispatch(setError(errorMessage));
  }
}