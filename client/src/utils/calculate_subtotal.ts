import { Cart } from '../types/cart';

export function calculateSubtotal(cart: Cart[]): number {
  let result = 0;

  cart.forEach((item) => (result += (item?.qty || 0) * +item.price));

  return +result.toFixed(2);
}
