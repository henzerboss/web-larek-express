// src/routes/product.ts
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { getProducts, createProduct } from '../controllers/products';

const router = Router();

router.get('/', getProducts);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(2).max(30).required(),
      image: Joi.object({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      }).required(),
      category: Joi.string().required(),
      description: Joi.string().optional(),
      // цена может быть числом или null
      price: Joi.number().allow(null).optional(),
    }),
  }),
  createProduct,
);

export default router;
