import { coinbaseApi } from "../util/coinbaseUtils";
import {
  WebSocketEvent,
} from "coinbase-pro-node";
import { BollingerBands } from "trading-signals";
import { Strategy } from "./Strategy";

export class BollingerBandsAnalyzer extends Strategy {

  static async start(product_id: string, interval: number) {
    const bbands = new BollingerBands(interval);

    this.subscribeToTicker(product_id);

    coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE_TICKER, (ticker) => {
      console.log("Price: ", ticker.price);
      
      bbands.update(ticker.price);
      
      if (bbands.isStable) {
        const lowerBand = bbands.getResult().lower.valueOf();
        const upperBand = bbands.getResult().upper.valueOf();

        if (ticker.price <= lowerBand) {
          this.placeMarketOrder(product_id, "BUY", "0.003");
        }
        if (ticker.price >= upperBand) {
          this.placeMarketOrder(product_id, "SELL", "0.003");
        }
      }
    });
  }

  
}
