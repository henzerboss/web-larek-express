// src/routes/order.ts
import { Router } from 'express';
import { validateCreateOrder } from '../middlewares/validators';
import createOrder from '../controllers/orders';

const router = Router();

router.post('/', validateCreateOrder, createOrder);

export default router;
