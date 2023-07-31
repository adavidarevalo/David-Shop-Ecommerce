/** @format */
import dotenv from 'dotenv';
dotenv.config();

import { connectDatabase } from './config/database.config';
import express from 'express';
import cors from 'cors';
import { productRouter } from './routes/product.routes';
import { userRouter } from './routes/user.routes';
import { orderRouter } from './routes/order.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', express.static('public'));

app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDatabase();
});
