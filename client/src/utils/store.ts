import { Cart } from '../types/cart';
import { calculateSubtotal } from './calculate_subtotal';

export const updateLocalStorage = (cart: Cart[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const getLocalStorageCart = (): Cart[] => {
  const products = localStorage.getItem('cartItems');
  return JSON.parse(products || '[]');
};

export const getLocalStorageSubtotal = (): number => {
  const products = localStorage.getItem('cartItems');
  const subtotal = calculateSubtotal(JSON.parse(products || '[]'));
  return subtotal;
};
