import { Router } from 'express'
import { createLimitOrder, getLimitOrders } from '../controllers/orders';

const router = Router();

router.post('/', createLimitOrder);
router.get('/', getLimitOrders);

export default router;