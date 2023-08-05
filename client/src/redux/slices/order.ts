import { createSlice } from '@reduxjs/toolkit';
import { ShippingInformationForm } from '../../components/form/shipping_information';
import { Order } from '../../types/order';

export interface OrderState {
  loading: boolean;
  error: string | null;
  shippingAddress: ShippingInformationForm | null;
  order: Order | null;
}

export const initialState: OrderState = {
  loading: false,
  error: null,
  shippingAddress: null,
  order: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload || true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.shippingAddress = null;
      state.order = null;
    },
    shippingAddressAdd: (state, { payload }) => {
      state.shippingAddress = payload;
      state.error = null;
      state.loading = false;
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

export const { setLoading, setError, shippingAddressAdd, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state: OrderState) => state.order;
