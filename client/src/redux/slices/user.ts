import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../actions/user.actions';
import { Order } from '../../types/order';

export interface UserState {
  loading: boolean;
  error: string | null;
  userInfo: User | null;
  updateSuccess: boolean;
  orders: Order[];
}

export const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
  updateSuccess: false,
  orders: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload ?? true;
    },
    userLogin: (state, { payload }: PayloadAction<User>) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
    },
    userLogOut: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.orders = [];
    },
    updateUserProfile: (state, { payload }: PayloadAction<User>) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
      state.updateSuccess = true;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state, { payload }: PayloadAction<Order[]>) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
      state.updateSuccess = false;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogOut,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state: { user: UserState }) => state.user;
