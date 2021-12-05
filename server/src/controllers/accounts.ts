import { Request, Response } from "express";
import { coinbaseApi } from "../util/coinbaseUtils";

// Use coinbase api to get active accounts
export const getAccount = async (req: Request, res: Response) => {
  try {
    let allAccounts = await coinbaseApi.rest.account.listAccounts();
    const product_id = req.query.product_id as string;
    const [baseCurrency, quoteCurrency] = product_id.split("-");
    const baseBalance = allAccounts.filter(
      (account) => account.currency === baseCurrency
    )[0].balance;
    const quoteBalance = allAccounts.filter(
      (account) => account.currency === quoteCurrency
    )[0].balance;

    return res.status(200).json({ baseBalance, quoteBalance });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
