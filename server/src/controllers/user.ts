import { Request, Response } from "express";
import User from "../models/user";
import { coinbaseApi, getActiveAccounts } from "../util/coinbaseUtils";

export const getCoinbaseAccounts = async (req: Request, res: Response) => {
  const activeAccounts = await getActiveAccounts("cb");
  res.send(activeAccounts);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.create({
      username,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};
