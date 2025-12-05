// src/middlewares/errorHandler.ts
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = (err as any).statusCode || 500;
  const message = statusCode === 500
    ? 'На сервере произошла ошибка'
    : err.message;

  res.status(statusCode).send({ message });
};

export default errorHandler;
