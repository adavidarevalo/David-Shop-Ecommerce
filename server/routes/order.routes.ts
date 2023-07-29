/** @format */

import { Router } from 'express';
import { createOrder, getOrders, deleteOrder, setDelivered } from '../controllers/order.controller';
import { protectRouteMiddleware } from '../middleware/auth.midleware';
import { adminProtectRouteMiddleware } from '../middleware/admin.middleware';

const router = Router();

router.post('/', [protectRouteMiddleware], createOrder);
router.get('/', [protectRouteMiddleware, adminProtectRouteMiddleware], getOrders);
router.delete('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], deleteOrder);
router.put('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], setDelivered);

export { router as orderRouter };
