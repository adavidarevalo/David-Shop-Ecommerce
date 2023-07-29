/** @format */

import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      data: products,
      success: true,
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      errors: error,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json({
      data: product,
      success: true,
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      errors: error.message,
    });
  }
};

export const createProductReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment, userId, title } = req.body

  const product = await Product.findById(req.params.id)

  const user = await User.findById(userId)

  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === user._id.toString())

    if (alreadyReviewed) {
      res.status(400).json({
        success: false,
        data: null,
        error: 'Product already review.'
      })
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id
    }

    product.reviews.push(review)

    product.numberOfReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

    await product.save()

    res.status(201).json({
      data: null,
      error: null,
      success: true
    })
  }
  res.status(404).json({
    success: false,
    data: null,
    error: 'Product not found.'
  })
}) 