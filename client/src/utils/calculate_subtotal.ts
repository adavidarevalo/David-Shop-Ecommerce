/** @format */

import { Product } from '../components/product_card';

export function calculateSubtotal(cart: Product[]): number {
  let result = 0;

  cart.forEach((item) => (result += (item?.qty || 0) * item.price));

  return +result.toFixed(2);
}
