// src/controllers/order.ts
import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      payment,
      email,
      phone,
      address,
      total,
      items,
    } = req.body;

    if (!payment || !email || !phone || !address) {
      throw new BadRequestError('Отсутствуют обязательные поля заказа');
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestError('Список товаров не может быть пустым');
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      throw new BadRequestError('Некоторые товары не найдены');
    }

    const unavailable = products.filter((product) => product.price == null);
    if (unavailable.length > 0) {
      throw new BadRequestError('В заказе есть товары без цены');
    }

    const sum = products.reduce((acc, product) => acc + (product.price ?? 0), 0);

    if (sum !== total) {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    const id = faker.string.uuid();

    res.status(200).send({
      id,
      total: sum,
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
