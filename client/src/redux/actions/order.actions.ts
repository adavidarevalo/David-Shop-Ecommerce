import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearOrder, setError, setLoading, shippingAddressAdd } from '../slices/order';
import { ShippingInformationForm } from '../../components/form/shipping_information';

export const setShippingAddress = (address: ShippingInformationForm) => (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(shippingAddressAdd(address));
};

export const createOrder = (order: any) => async (dispatch: Dispatch, getState: any) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post('api/orders', preparedOrder, config);
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

export const resetOrder = () => (dispatch: Dispatch) => {
  dispatch(setLoading(false));
  dispatch(clearOrder());
};
