/** @format */

import { Request, Response } from 'express';
import { User } from '../types/user';

export const adminProtectRouteMiddleware = (req: Request & { user: User }, res: Response, next: NewableFunction) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      success: false,
      data: null,
      error: 'Not authorized as an admin.',
    });
  }
};
