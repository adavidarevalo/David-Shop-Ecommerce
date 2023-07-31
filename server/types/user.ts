/** @format */

import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
