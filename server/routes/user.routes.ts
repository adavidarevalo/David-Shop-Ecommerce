/** @format */

import { Router } from 'express';
import {
  deleteUser,
  getUserOrders,
  getUsers,
  loginUser,
  registerUser,
  updateProfile,
} from '../controllers/user.controller';
import { protectRouteMiddleware } from '../middleware/auth.midleware';
import { adminProtectRouteMiddleware } from '../middleware/admin.middleware';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/update/:id', [protectRouteMiddleware], updateProfile);
router.get('/:id', [protectRouteMiddleware], getUserOrders);
router.get('/', [protectRouteMiddleware, adminProtectRouteMiddleware], getUsers);
router.delete('/:id', [protectRouteMiddleware, adminProtectRouteMiddleware], deleteUser);

export { router as userRouter };
