import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { Order } from '../../types/order';

export interface AdminState {
  loading: boolean;
  error: string | null;
  userList: User[];
  orders: Order[];
  report: any[];
}

export const initialState: AdminState = {
  loading: false,
  error: null,
  userList: [],
  orders: [],
  report: [],
};

export const AdminSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getUsersData: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.userList = payload;
    },
    userDelete: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.userList = state.userList.filter((user) => user._id !== payload);
    },
    getOrders: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.orders = payload;
    },
    setUpdateDelivered: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.orders = state.orders.map((order) => {
        if (order._id === payload) {
          order.isDelivered = true;
        }
        return order;
      });
    },
    orderDelete: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.orders = state.orders.filter((order) => order._id !== payload);
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
    getReport: (state, { payload }) => {
      state.error = null;
      state.report = payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  getUsersData,
  userDelete,
  resetError,
  getOrders,
  orderDelete,
  setUpdateDelivered,
  getReport,
} = AdminSlice.actions;
export default AdminSlice.reducer;

export const adminSelector = (state: AdminState) => state.orders;
