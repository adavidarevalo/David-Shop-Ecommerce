import { createSlice } from '@reduxjs/toolkit';

export interface AdminState {
    loading: boolean;
    error: string | null;
    userList: any[];
    userRemoval: boolean;
    orders: any[];
    orderRemoval: boolean;
    deliveredFlag: boolean;
}

export const initialState: AdminState = {
    loading: false,
    error: null,
    userList: [],
    userRemoval: false,
    orders: [],
    orderRemoval: false,
    deliveredFlag: false
};

export const AdminSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload || true;
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
        userDelete: (state) => {
            state.loading = false;
            state.userRemoval = true;
            state.userRemoval = false;
        },
        getOrders: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.orders = payload;
        },
        orderDelete: (state) => {
            state.loading = false;
            state.orderRemoval = true;
            state.error = null;
        },
        setDeliveredFlag: (state) => {
            state.loading = false;
            state.error = null;
            state.deliveredFlag = true
        },
        resetError: (state) => {
            state.error = null;
            state.loading = false;
            state.userRemoval = false;
            state.orderRemoval = false;
            state.deliveredFlag = false;
        }
    },
});

export const { setLoading, setError, getUsersData, userDelete, resetError, getOrders, orderDelete, setDeliveredFlag } = AdminSlice.actions;
export default AdminSlice.reducer;

export const adminSelector = (state: any) => state.order;
