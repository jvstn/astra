import axios from "axios";
import { OrderSide, OrderType, LimitOrder } from "coinbase-pro-node";
import { Request, Response } from "express";
import { coinbaseApi } from "../util/coinbaseUtils";



export const getLimitOrders = async (req: Request, res: Response) => {
  try {
    const orders = await coinbaseApi.rest.order.getOrders({limit: 3});
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};

export const getFilledOrders = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.product_id;
    console.log(req.params);
    const orders = await coinbaseApi.rest.fill.getFillsByProductId(product_id, {limit: 3});
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}


