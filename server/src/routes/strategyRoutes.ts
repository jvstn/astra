import { Router } from "express";
import { startBollBands, stopBollBands } from "../controllers/strategies";

const router = Router();

router.post("/boll-bands", startBollBands);
router.get("/boll-bands", stopBollBands);



export default router;