/** @format */

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../models/order.model';

export const getReport = asyncHandler(async (req: Request, res: Response) => {
  const { from, to, type } = req.body;
  if (type === 'USERS_WHO_BUY_THE_MOST') {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const orders = await Order.find(
      {
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
      'user username email orderItems'
    );

    const ordersGrouped = {};

    orders.forEach(order => {
      let totalPrice = 0;
      order.orderItems.forEach(o => (totalPrice += o.price));
      if (!ordersGrouped[order.user.toString()]) {
        ordersGrouped[order.user.toString()] = {
          user: order.user,
          name: order.username,
          email: order.email,
          result: totalPrice,
        };
      } else {
        ordersGrouped[order.user.toString()].result += totalPrice;
      }
    });

    res.status(200).json({
      data: Object.values(ordersGrouped),
      success: true,
      errors: null,
    });
  }
  if (type === 'MOST_SELLED_PRODUCTS') {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const orders = await Order.find(
      {
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
      'orderItems'
    );

    const productsGrouped = {};

    orders.forEach(({ orderItems }) => {
      orderItems.forEach(order => {
        if (!order[order._id.toString()]) {
          productsGrouped[order._id.toString()] = {
            _id: order._id,
            name: order.name,
            result: 1,
          };
        } else {
          productsGrouped[order._id.toString()].result++;
        }
      });
    });

    res.status(200).json({
      data: Object.values(productsGrouped),
      success: true,
      errors: null,
    });
  }
});
