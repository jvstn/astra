import { Router } from "express";
import { createLimitOrder, startBollBands, startRSI, stopBollBands, stopRSI } from "../controllers/strategies";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/boll-bands", checkAuth, startBollBands);
router.delete("/boll-bands", checkAuth, stopBollBands);

router.post("/rsi", checkAuth, startRSI);
router.delete("/rsi", checkAuth, stopRSI);

router.post("/target-price", checkAuth, createLimitOrder);

export default router;