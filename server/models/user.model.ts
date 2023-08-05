/** @format */

import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  matchPasswords(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<UserDocument>('User', userSchema);
