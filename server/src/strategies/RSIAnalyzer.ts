import { coinbaseApi } from "../util/coinbaseUtils";
import {
  WebSocketEvent,
  WebSocketTickerMessage,
} from "coinbase-pro-node";
import {RSI} from 'trading-signals'
import { AbstractStrategy } from "./AbstractStrategy";

export class RSIAnalyzer extends AbstractStrategy {
  

  static async start(product_id: string, interval: number) {
    
    const rsi = new RSI(interval);
    
    this.subscribeToTicker(product_id);
    this.addActiveStrategy(product_id, "RSI");


    
      coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE_TICKER, (ticker: WebSocketTickerMessage) => {
      
        if (ticker.product_id === product_id && this.isActiveStrategy(product_id, "RSI")) {
          console.log(`${ticker.product_id} price:  ${ticker.price}`);
        

          rsi.update(ticker.price);
          if (rsi.isStable) {
            const rsiValue = Number(rsi.getResult().toPrecision(4));
            console.log(`${ticker.product_id} rsi:  ${rsiValue}`);
            if (this.isOverbought(rsiValue)) {
              this.placeMarketOrder(product_id, "SELL", "0.003");
            }
            if (this.isOversold(rsiValue)) {
              this.placeMarketOrder(product_id, "BUY", "0.003");
            }

          }
        }
      })
  }
  

  private static isOverbought(rsiValue: number) {
    return rsiValue >= 57;
  }

  private static isOversold(rsiValue: number) {
    return rsiValue <= 35;
  }


}