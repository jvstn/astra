import { Router } from "express";
import axios from "axios";
import "dotenv/config";
import { CoinbasePro } from "coinbase-pro-node";
import { createUser, getCoinbaseAccounts } from "../controllers/user";

const router = Router();


router.get('/', createUser);

router.get("/coinbase-accounts", getCoinbaseAccounts);


export default router;
