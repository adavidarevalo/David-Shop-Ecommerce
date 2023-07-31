import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/product';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';

const reducer = combineReducers({ products, cart, user, order, admin });

const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof reducer>;

export default store;
