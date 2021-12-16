import { LimitOrder, OrderSide, OrderType } from 'coinbase-pro-node';
import { Request, Response } from 'express'
import { AbstractStrategy } from '../strategies/AbstractStrategy';
import { BollingerBandsAnalyzer } from '../strategies/BollBands'
import { RSIAnalyzer } from '../strategies/RSIAnalyzer';
import { coinbaseApi } from '../util/coinbaseUtils';

interface BollBandsRequestBody {
  product_id: string;
  interval: string;
  standardDeviation: string;
}

interface RSIRequestBody {
  product_id: string;
  interval: string;
}

interface LimitRequestBody {
  price: string;
  size: string;
  product_id: string;
  side: "BUY" | "SELL";
}

export const getProductActiveStrategies = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  console.log(product_id);
  const strategies = AbstractStrategy.getActiveStrategies(product_id.toUpperCase());
  res.json(strategies);
}

export const startBollBands = async (req: Request, res: Response) => {
  try {
    const { product_id, interval }: BollBandsRequestBody =
      req.body;
    BollingerBandsAnalyzer.start(product_id, Number(interval));
    res.status(200).send("Strategy started succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const stopBollBands = async (req: Request, res: Response) => {
  try {
    const product_id = req.query.product_id as string;
    BollingerBandsAnalyzer.stop(product_id, "BBANDS");
    res.status(200).send("Strategy stopped succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const startRSI = async (req: Request, res: Response) => {
  try {
    const { product_id, interval }: RSIRequestBody = req.body;
    RSIAnalyzer.start(product_id, Number(interval));
    res.status(200).send("Strategy started succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const stopRSI = async (req: Request, res: Response) => {
  try {
    const product_id = req.query.product_id as string;
    RSIAnalyzer.stop(product_id, "RSI");
    res.status(200).send("Strategy stopped succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }

}



export const createLimitOrder = async (req: Request, res: Response) => {
  try {
    const { price, size, side, product_id }: LimitRequestBody = req.body;
    const order: LimitOrder = {
      price,
      product_id,
      size,
      side: OrderSide[side],
      type: OrderType.LIMIT,
    };
    const response = await coinbaseApi.rest.order.placeOrder(order);
    console.log(response)
    res.status(200).send("Order placed successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};




