/** @format */
import { Product } from '../components/product_card';
import { calculateSubtotal } from './calculate_subtotal';

export const updateLocalStorage = (cart: Product[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const getLocalStorageCart = (): Product[] => {
  const products = localStorage.getItem('cartItems');
  return JSON.parse(products || '[]');
};

export const getLocalStorageSubtotal = (): number => {
  const products = localStorage.getItem('cartItems');
  const subtotal = calculateSubtotal(JSON.parse(products || '[]'));
  return subtotal;
};
