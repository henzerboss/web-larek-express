import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes';

import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
} = process.env;

const app = express();

app.use(requestLogger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
