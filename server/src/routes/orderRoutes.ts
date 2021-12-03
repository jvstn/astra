import { Router } from 'express'
import { getFilledOrders, getLimitOrders } from '../controllers/orders';

const router = Router();


router.get('/open/:product_id', getLimitOrders);

router.get('/fill/:product_id', getFilledOrders);

export default router;