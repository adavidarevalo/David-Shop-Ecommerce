/** @format */

import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { decodeToken } from '../utils/token';
import { User } from '../models/user.model';
import { User as UserInterface } from '../types/user';

export const protectRouteMiddleware = asyncHandler(
  async (req: Request & { user: UserInterface }, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const decoded = decodeToken(token);
        const id = (decoded as { id?: string })?.id;

        req.user = await User.findById(id);

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
