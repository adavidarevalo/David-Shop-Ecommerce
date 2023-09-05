/** @format */

import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model';
import { Types } from 'mongoose';
import { User as UserInterface } from '../types/user';
import multer from 'multer';
import shortid from 'shortid';
import fs from 'fs';

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
      return;
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

    return;
  }
  res.status(404).json({
    success: false,
    data: null,
    error: 'Product not found.',
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { brand, name, category, stock, price, image, productIsNew, description } = req.body;

  // const multerConfig = {
  //   limits: {fileSize: req.user? 1024 * 1024 *10 : 1024 * 1024},
  //   storage: fileStorage = multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb( null, __dirname+"/../uploads" )
  //     },
  //     filename: (req, file, cb) =>{
  //       const extention = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
  //       cb( null, `${shortid.generate()}${extention}` )
  //     }
  //   })
  //   }

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

export const deleteReviewProduct = asyncHandler(async (req: Request & { user: UserInterface }, res: Response) => {
  const { productId, reviewId } = req.params;

  const product = await Product.findById(productId);

  const reviews = product.reviews.filter(
    review => review._id.toString() !== reviewId && review.user.toString() === req.user._id.toString()
  );

  if (product.reviews.length === reviews.length) {
    res.status(404).json({
      data: null,
      error: 'Review not found.',
      success: false,
    });
    return;
  }

  product.reviews = new Types.DocumentArray(reviews);

  await product.save();

  res.status(200).json({
    data: null,
    error: null,
    success: true,
  });
});

export const updateReviewProduct = asyncHandler(async (req: Request & { user: UserInterface }, res: Response) => {
  const { productId, reviewId } = req.params;
  const { title, comment, rating } = req.body;

  const product = await Product.findById(productId);

  const reviews = product.reviews.map(review => {
    if (review._id.toString() !== reviewId && review.user.toString() === req.user._id.toString()) {
      review.title = title;
      review.comment = comment;
      review.rating = rating;
    }
    return review;
  });

  product.reviews = new Types.DocumentArray(reviews);

  await product.save();

  res.status(200).json({
    data: null,
    error: null,
    success: true,
  });
});
