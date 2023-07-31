/** @format */

import mongoose, { Schema, model } from 'mongoose';

const review = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [review],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    productIsNew: {
      type: Boolean,
      required: true,
      default: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model('Product', product);
