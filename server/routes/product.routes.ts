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
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/reviews/:id', [protectRouteMiddleware], createProductReview);
router.put('/', [protectRouteMiddleware, adminProtectRouteMiddleware], upload.single('file'), uploadProduct);
router.delete('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], deleteProduct);
router.delete('/review/:productId/:reviewId', [protectRouteMiddleware], deleteReviewProduct);
router.put('/review/:productId/:reviewId', [protectRouteMiddleware], updateReviewProduct);
router.post('/', [protectRouteMiddleware, adminProtectRouteMiddleware], upload.single('file'), createProduct);
router.put('/:productId/:reviewId', [protectRouteMiddleware, adminProtectRouteMiddleware], removeProductReview);

export { router as productRouter };
