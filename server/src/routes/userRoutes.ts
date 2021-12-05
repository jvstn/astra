import "dotenv/config";
import { Router } from "express";
import { createUser } from "../controllers/auth/createUser";

import {
  addToWatchlist,
  getWatchList,
  removeFromWatchlist
} from "../controllers/watchlist";

const router = Router();

router.post("/create", createUser);


router.get("/watchlist/:username", getWatchList);
router.post("/watchlist", addToWatchlist);
router.delete("/watchlist", removeFromWatchlist);




export default router;
