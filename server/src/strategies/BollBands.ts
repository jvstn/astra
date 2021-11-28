import { coinbaseApi } from "../util/coinbaseUtils";
import {
  OrderSide,
  OrderType,
  WebSocketChannelName,
  WebSocketEvent,
  WebSocketTickerMessage,
} from "coinbase-pro-node";
coinbaseApi;
import { BollingerBands } from "trading-signals";
import { channel } from "diagnostics_channel";

export class BollingerBandsAnalyzer {

  static async start(product_id: string, interval: number, standardDeviation: number = 2) {
    const bbands = new BollingerBands(interval, standardDeviation);

    const channel = {
      name: WebSocketChannelName.TICKER,
      product_ids: [product_id],
    };

    coinbaseApi.ws.subscribe(channel);

    coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE_TICKER, (ticker) => {
      console.log("Price: ", ticker.price);
      
      bbands.update(ticker.price);
      
      if (bbands.prices.length === bbands.interval) {
        const lowerBand = bbands.getResult().lower.valueOf();
        const upperBand = bbands.getResult().upper.valueOf();
        if (lowerBand >= ticker.price) {
          this.placeMarketOrder(product_id, "BUY", "0.003");
        }
        if (upperBand <= ticker.price) {
          this.placeMarketOrder(product_id, "SELL", "0.003");
        }
      }
    });
  }

  static stop(product_id: string) {
    coinbaseApi.ws.unsubscribe({
      name: WebSocketChannelName.TICKER,
      product_ids: [product_id],
    });
  }

  private static async placeMarketOrder(product_id: string, side: "BUY" | "SELL", size: string) {
    const order = await coinbaseApi.rest.order.placeOrder({
      product_id,
      side: OrderSide[side],
      type: OrderType.MARKET,
      size,
    });
    console.log(order);
  }
}
