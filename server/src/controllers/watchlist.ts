import { Request, Response } from "express";
import User from "../models/user";

interface AddWatchListRequest {
  product_id: string;
  username: string;
}

export const getWatchList = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user.watchlist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const { product_id, username }: AddWatchListRequest = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.watchlist.push({ product_id });
      await user.save();
      res.send(user.watchlist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};

export const removeFromWatchlist = async (req: Request, res: Response) => {
  try {
    const { product_id, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.watchlist = user.watchlist.filter(
        (item) => item.product_id !== product_id
      );
      await user.save();
      res.send(user.watchlist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};
