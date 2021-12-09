import { coinbaseApi } from "../util/coinbaseUtils";
import { WebSocketEvent } from "coinbase-pro-node";
import { BollingerBands } from "trading-signals";
import { AbstractStrategy } from "./AbstractStrategy";

export class BollingerBandsAnalyzer extends AbstractStrategy {
  static async start(product_id: string, interval: number) {
    const bbands = new BollingerBands(interval);

    this.subscribeToTicker(product_id);

    this.addActiveStrategy(product_id, "BBANDS");


    coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE_TICKER, (ticker) => {
      if (ticker.product_id === product_id && this.isActiveStrategy(product_id, "BBANDS")) {
        console.log("BB " + product_id + " Price: ", ticker.price);
        
        bbands.update(ticker.price);
        if (bbands.isStable) {
          const lowerBand = bbands.getResult().lower.valueOf();
          console.log("Lower band: ", lowerBand);
          const upperBand = bbands.getResult().upper.valueOf();
          console.log("Upper band: ", upperBand);

          if (ticker.price <= lowerBand) {
            this.placeMarketOrder(product_id, "BUY", "0.003");
          }
          if (ticker.price >= upperBand) {
            this.placeMarketOrder(product_id, "SELL", "0.003");
          }
        }
      }
    });
  }
}
