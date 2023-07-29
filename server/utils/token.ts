/** @format */

import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
