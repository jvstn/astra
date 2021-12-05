import { Request, Response } from "express";
import User from "../models/user";

interface AddWatchListRequest {
  product_id: string;
  username: string;
}

export const getWatchList = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const product_ids = user.watchlist.map((item) => item.product_id);
      res.send(product_ids);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const { product_id, username }: AddWatchListRequest = req.body;
    console.log(product_id, username);
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.watchlist.push({ product_id });
      await user.save();
      res.send(user.watchlist.unshift());
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};

export const removeFromWatchlist = async (req: Request, res: Response) => {
  try {
    const product_id = req.query.product_id as string;
    const username = req.query.username as string;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.watchlist = user.watchlist.filter(
        (item) => item.product_id !== product_id
      );
      await user.save();
      console.log(user.watchlist);
      res.send(user.watchlist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.")
  }
};
