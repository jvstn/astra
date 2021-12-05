import { Request, Response } from "express";
import { coinbaseApi } from "../util/coinbaseUtils";

// Use coinbase api to get active accounts
export const getAccount = async (req: Request, res: Response) => {
  try {
    let allAccounts = await coinbaseApi.rest.account.listAccounts();
    const currency = req.query.currency as string;
    let activeAccount = allAccounts.filter(
      (account) => account.currency === currency
    );

    return res.status(200).json(activeAccount[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
    
  
}
