import "dotenv/config";
import { Router } from "express";
import { createUser, getCoinbaseAccounts } from "../controllers/user";
import {
  addToWatchlist,
  getWatchList,
  removeFromWatchlist
} from "../controllers/watchlist";

const router = Router();

router.get("/", createUser);

router.get("/coinbase-accounts", getCoinbaseAccounts);

router.get("/watchlist/:username", getWatchList);
router.post("/watchlist", addToWatchlist);
router.delete("/watchlist", removeFromWatchlist);




export default router;
