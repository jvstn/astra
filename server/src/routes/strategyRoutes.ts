import { Router } from "express";
import { createLimitOrder, getProductActiveStrategies, startBollBands, startRSI, stopBollBands, stopRSI } from "../controllers/strategies";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.get('/active/:product_id', checkAuth, getProductActiveStrategies)

router.post("/bbands", checkAuth, startBollBands);
router.delete("/bbands", checkAuth, stopBollBands);

router.post("/rsi", checkAuth, startRSI);
router.delete("/rsi", checkAuth, stopRSI);

router.post("/target-price", checkAuth, createLimitOrder);

export default router;