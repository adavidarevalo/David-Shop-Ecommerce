import { Product } from '../types/product';

export function deleteReview(productId: string, reviewId: string, products: Product[]) {
  const product = products.find((product) => product._id === productId);

  if (!product) return products;

  const reviewIndex = product.reviews.findIndex((review) => review._id === reviewId);

  if (reviewIndex === -1) return products;

  product.reviews.splice(reviewIndex, 1);

  return products;
}
