import { Router } from "express";
import { startBollBands, startRSI, stopBollBands, stopRSI } from "../controllers/strategies";

const router = Router();

router.post("/boll-bands", startBollBands);
router.get("/boll-bands", stopBollBands);

router.post("/rsi", startRSI);
router.get("/rsi", stopRSI);

export default router;