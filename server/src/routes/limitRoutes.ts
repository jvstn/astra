import { Router } from 'express'
import { createLimitOrder } from '../controllers/limitOrder';

const router = Router();

router.post('/', createLimitOrder);


export default router;