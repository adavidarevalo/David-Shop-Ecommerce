import { Request, Response } from "express";

export const adminProtectRouteMiddleware = (req: Request & { user: any }, res: Response, next: NewableFunction) => {
    if (req.user.isAdmin) next();

    res.status(401).send({
        success: false,
        data: null,
        error: 'Not authorized as an admin.',
    });
}