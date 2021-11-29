import { Router } from "express";
import "dotenv/config";
import { createUser, getCoinbaseAccounts } from "../controllers/user";
import { addToWatchlist, getWatchList, removeFromWatchlist } from "../controllers/watchlist";

const router = Router();


router.get('/', createUser);

router.get("/coinbase-accounts", getCoinbaseAccounts);

router.get("/watchlist", getWatchList);
router.post('/watchlist', addToWatchlist);
router.delete('/watchlist', removeFromWatchlist);

export default router;
