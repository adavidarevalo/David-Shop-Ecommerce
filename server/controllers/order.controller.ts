import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../models/order.model';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      data: null,
      success: true,
      errors: 'No order items provided',
    });
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      data: createdOrder,
      success: true,
      errors: null,
    });
  }
});

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({})
  res.status(200).json({
    data: orders,
    success: true,
    errors: null,
  });
}

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (order) {
    res.status(200).json({
      data: order,
      success: true,
      errors: null,
    });
  }
  if (!order) {
    res.status(404).json({
      data: null,
      success: false,
      errors: 'Order not found',
    });
  }
})

export const setDelivered = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save()

    res.status(200).json({
      data: updatedOrder,
      success: true,
      errors: null,
    });
  }
  if (!order) {
    res.status(404).json({
      data: null,
      success: false,
      errors: 'Order not found',
    });
  }
})