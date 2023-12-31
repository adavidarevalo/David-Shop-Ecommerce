/** @format */

import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model';
import { Types } from 'mongoose';

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
  const { rating, comment, userId, title } = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(userId);

  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === user._id.toString());

    if (alreadyReviewed) {
      res.status(400).json({
        success: false,
        data: null,
        error: 'Product already review.',
      });
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    product.reviews.push(review);

    product.numberOfReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      data: null,
      error: null,
      success: true,
    });
  }
  res.status(404).json({
    success: false,
    data: null,
    error: 'Product not found.',
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { brand, name, category, stock, price, image, productIsNew, description } = req.body;

  const newProduct = await Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
  });

  await newProduct.save();

  const products = await Product.find({});

  if (newProduct) {
    res.status(201).json({
      data: products,
      error: null,
      success: true,
    });
  }

  if (!newProduct) {
    res.status(404).json({
      data: null,
      error: 'Product could not created.',
      success: false,
    });
  }
});

export const uploadProduct = asyncHandler(async (req: Request, res: Response) => {
  const { brand, name, category, stock, price, image, productIsNew, description, _id } = req.body;

  const product = await Product.findById(_id);

  if (!product) {
    res.status(404).json({
      data: null,
      error: 'Product not found.',
      success: false,
    });
  }

  product.name = name || product.name;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.stock = stock || product.stock;
  product.price = price || product.price;
  product.image = image || product.image;
  product.productIsNew = productIsNew;
  product.description = description || product.description;

  const updatedProduct = await product.save();

  if (updatedProduct) {
    res.status(200).json({
      data: updatedProduct,
      error: null,
      success: true,
    });
  }

  if (!updatedProduct) {
    res.status(500).json({
      data: null,
      error: 'Product could not updated.',
      success: false,
    });
  }
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.status(200).json({
      data: product,
      error: null,
      success: true,
    });
  }

  if (!product) {
    res.status(404).json({
      data: null,
      error: 'Product not found.',
      success: false,
    });
  }
});

export const removeProductReview = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404).json({
      data: null,
      error: 'Product not found.',
      success: false,
    });
  }

  const updatedReviews = product.reviews.filter(rev => rev._id.valueOf() !== req.params.reviewId);

  product.reviews = new Types.DocumentArray(updatedReviews);
  product.numberOfReviews = product.reviews.length;

  if (product.numberOfReviews > 0) {
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
  } else {
    product.rating = 1;
  }

  await product.save();

  res.status(200).json({
    data: null,
    error: null,
    success: true,
  });
});
