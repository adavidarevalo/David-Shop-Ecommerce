/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products, { ProductState } from './slices/product';
import cart, { CartState } from './slices/cart';
import user, { UserState } from './slices/user';
import order, { OrderState } from './slices/order';
import admin, { AdminState } from './slices/admin';

const reducer = combineReducers({ products, cart, user, order, admin });

export default configureStore<{
  user: UserState;
  products: ProductState;
  cart: CartState;
  order: OrderState;
  admin: AdminState
}>({ reducer });
