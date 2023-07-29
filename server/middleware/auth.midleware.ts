/** @format */

import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { decodeToken } from '../utils/token';
import { User } from '../models/user.model';

export const protectRouteMiddleware = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        token = req.headers.authorization.split('Bearer ')[1];
        const decoded = decodeToken(token);

        req.user = User.findById((decoded as { id?: string })?.id);
        next();
      } catch (error) {
        res.status(401).json({
          success: false,
          data: null,
          error: 'Invalid token',
        });
      }
    } else {
      res.status(401).json({
        success: false,
        data: null,
        error: 'Not authorized, not token',
      });
    }
  }
);