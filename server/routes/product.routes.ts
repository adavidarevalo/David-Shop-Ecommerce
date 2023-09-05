/** @format */

import { Router } from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReviewProduct,
  getAllProducts,
  getProduct,
  removeProductReview,
  updateReviewProduct,
  uploadProduct,
} from '../controllers/product.controller';
import { protectRouteMiddleware } from '../middleware/auth.midleware';
import { adminProtectRouteMiddleware } from '../middleware/admin.middleware';
import { upload } from '../middleware/upload_file.middleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/reviews/:id', [protectRouteMiddleware], createProductReview);
router.put('/', [protectRouteMiddleware, adminProtectRouteMiddleware], uploadProduct);
router.delete('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], deleteProduct);
router.delete('/review/:productId/:reviewId', [protectRouteMiddleware], deleteReviewProduct);
router.put('/review/:productId/:reviewId', [protectRouteMiddleware], updateReviewProduct);
router.post('/', [protectRouteMiddleware, adminProtectRouteMiddleware], createProduct);
router.put('/:productId/:reviewId', [protectRouteMiddleware, adminProtectRouteMiddleware], removeProductReview);

export { router as productRouter };
