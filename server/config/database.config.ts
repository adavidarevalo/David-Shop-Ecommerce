/** @format */

import mongoose from 'mongoose';
export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Ecomerce',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
