/** @format */

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model';
import { generateToken } from '../utils/token';
import { Order } from '../models/order.model';
import { User as UserInterface } from '../types/user';

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createAt: user.createdAt,
        token: generateToken(user._id),
      },
      error: null,
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      error: 'Invalid Credentials',
    });
  }
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400).json({
      success: false,
      data: null,
      error: 'User already exist',
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createAt: user.createdAt,
        token: generateToken(user._id),
      },
      error: null,
    });
  } else {
    res.status(500).json({
      success: false,
      data: null,
      error: 'Something went wrong',
    });
  }
});

export const updateProfile = asyncHandler(async (req: Request & { user: UserInterface }, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createAt: user.createdAt,
        token: generateToken(user._id),
      },
      error: null,
    });
  } else {
    res.status(404).json({
      success: false,
      data: null,
      error: 'User not found',
    });
  }
});

export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.status(200).json({
      success: true,
      data: orders,
      error: null,
    });
  } else {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Orders not found',
    });
  }
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}, '-password');

  res.status(200).json({
    success: true,
    data: users,
    error: null,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'User not found',
    });
  }
});
