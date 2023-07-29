import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { getOrders, getUsersData, orderDelete, resetError, setDeliveredFlag, setError, setLoading, userDelete } from '../slices/admin';

export const getAllUsers = () => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true))

    const {
        user: { userInfo },
    } = getState()

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('api/users', config)
        dispatch(getUsersData(data.data))
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'Users could not be fetched.';

        dispatch(setError(errorMessage));
    }
}

export const deleteUser = (id: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true))
    const {
        user: { userInfo },
    } = getState()

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`api/users/${id}`, config)
        dispatch(userDelete())
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'Users could not be fetched.';

        dispatch(setError(errorMessage));
    }
}

export const resetErrorAndRemoval = () => async (dispatch: Dispatch, getState: any) => {
    dispatch(resetError())
}

export const getAllOrders = () => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true))

    const {
        user: { userInfo },
    } = getState()

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('api/orders', config)
        dispatch(getOrders(data.data))
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'Orders could not be fetched.';

        dispatch(setError(errorMessage));
    }
}

export const deleteOrder = (id: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true))
    const {
        user: { userInfo },
    } = getState()

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`api/orders/${id}`, config)
        dispatch(orderDelete())
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'Order could not be deleted.';

        dispatch(setError(errorMessage));
    }
}

export const setDelivered = (id: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true))
    const {
        user: { userInfo },
    } = getState()

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.put(`api/orders/${id}`, {}, config)
        dispatch(setDeliveredFlag())
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'Order could not be updated.';

        dispatch(setError(errorMessage));
    }
}