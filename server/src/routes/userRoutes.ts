import "dotenv/config";
import { Router } from "express";
import { getAccount } from "../controllers/accounts";
import { checkUser } from "../controllers/auth/checkUser";
import { createUser } from "../controllers/auth/createUser";
import { login } from "../controllers/auth/loginUser";
import {
  addToWatchlist,
  getWatchList,
  removeFromWatchlist
} from "../controllers/watchlist";
import { checkAuth } from "../middleware/checkAuth";


const router = Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/check", checkUser);

router.get("/account", checkAuth, getAccount);

router.get("/watchlist/", checkAuth, getWatchList);
router.post("/watchlist", checkAuth, addToWatchlist);
router.delete("/watchlist", checkAuth, removeFromWatchlist);




export default router;
