/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../actions/user.actions';

export interface UserState {
  loading: boolean;
  error: string | null;
  userInfo: User | null;
  updateSuccess: boolean;
  orders: any[]
}

export const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  updateSuccess: false,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload || true;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
    userLogOut: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.orders = []
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
      state.updateSuccess = true;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
      state.updateSuccess = false;
    },
  },
});

export const { setLoading, setError, userLogin, userLogOut, updateUserProfile, resetUpdate, setUserOrders } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state: any) => state.user;
