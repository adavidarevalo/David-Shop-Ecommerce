/** @format */

import { Router } from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProduct,
  removeProductReview,
  uploadProduct,
} from '../controllers/product.controller';
import { protectRouteMiddleware } from '../middleware/auth.midleware';
import { adminProtectRouteMiddleware } from '../middleware/admin.middleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/reviews/:id', [protectRouteMiddleware], createProductReview);
router.put('/', [protectRouteMiddleware, adminProtectRouteMiddleware], uploadProduct);
router.delete('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], deleteProduct);
router.post('/', [protectRouteMiddleware, adminProtectRouteMiddleware], createProduct);
router.put('/:productId/:reviewId', [protectRouteMiddleware, adminProtectRouteMiddleware], removeProductReview);

export { router as productRouter };
