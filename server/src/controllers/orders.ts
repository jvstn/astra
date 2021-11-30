import axios from "axios";
import { OrderSide, OrderType, LimitOrder } from "coinbase-pro-node";
import { Request, Response } from "express";
import { coinbaseApi } from "../util/coinbaseUtils";

interface LimitRequestBody {
  price: string;
  size: string;
  product_id: string;
  side: "BUY" | "SELL";
}

export const createLimitOrder = async (req: Request, res: Response) => {
  try {
    const { price, size, side, product_id }: LimitRequestBody = req.body;
    const order: LimitOrder = {
      price,
      product_id,
      size,
      side: OrderSide[side],
      type: OrderType.LIMIT
    };
    await coinbaseApi.rest.order.placeOrder(order)
    res.status(200).send("Order placed successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};

export const getLimitOrders = async (req: Request, res: Response) => {
  try {
    const orders = await coinbaseApi.rest.order.getOrders();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};

export const getFilledOrders = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.product_id;
    const orders = await coinbaseApi.rest.fill.getFillsByProductId(product_id);
    console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

