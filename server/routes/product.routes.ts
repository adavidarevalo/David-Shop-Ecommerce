/** @format */

import { Router } from 'express';
import { createProductReview, getAllProducts, getProduct } from '../controllers/product.controller';
import { protectRouteMiddleware } from '../middleware/auth.midleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/reviews/:id', [protectRouteMiddleware], createProductReview);

export { router as productRouter };
