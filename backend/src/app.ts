import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import router from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
