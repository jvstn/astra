import { Request, Response } from "express";
import User from "../models/user";
import { coinbaseApi, getActiveAccounts } from "../util/coinbaseUtils";

export const getCoinbaseAccounts = async (req: Request, res: Response) => {
  const activeAccounts = await getActiveAccounts("cb");
  res.send(activeAccounts);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id: accountID } = await coinbaseApi.rest.user.verifyAuthentication();
    const coinbase_accounts = await getActiveAccounts("cb");
    const pro_wallets = await getActiveAccounts("pro");
    const { name } = req.body;
    const user = await User.create({
      name,
      accountID,
      coinbase_accounts,
      pro_wallets
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
