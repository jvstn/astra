import { Router } from 'express'
import { getFilledOrders, getLimitOrders } from '../controllers/orders';
import { checkAuth } from '../middleware/checkAuth';

const router = Router();


router.get("/open/:product_id", checkAuth, getLimitOrders);

router.get("/fill/:product_id", checkAuth, getFilledOrders);

export default router;