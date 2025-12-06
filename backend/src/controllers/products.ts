import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({});
    return res.send({
      items: products,
      total: products.length,
    });
  } catch (error) {
    return next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).send(product);
  } catch (error: any) {
    if (error instanceof MongooseError.ValidationError) {
      return next(
        new BadRequestError('Ошибка валидации данных при создании товара'),
      );
    }

    if (error?.message?.includes?.('E11000')) {
      return next(
        new ConflictError('Товар с таким title уже существует'),
      );
    }

    return next(error);
  }
};
