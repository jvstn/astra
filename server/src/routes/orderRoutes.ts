import { Router } from 'express'
import { createLimitOrder, getFilledOrders, getLimitOrders } from '../controllers/orders';

const router = Router();

router.post('/', createLimitOrder);
router.get('/', getLimitOrders);

router.get('/fills', getFilledOrders);

export default router;