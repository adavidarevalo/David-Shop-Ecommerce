/** @format */

import { Router } from 'express';
import { protectRouteMiddleware } from '../middleware/auth.midleware';
import { adminProtectRouteMiddleware } from '../middleware/admin.middleware';
import { getReport } from '../controllers/report.controller';

const router = Router();

router.post('/', [protectRouteMiddleware, adminProtectRouteMiddleware], getReport);

export { router as reportRouter };
