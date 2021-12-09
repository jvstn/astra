import { OrderSide, OrderType, WebSocketChannelName } from "coinbase-pro-node";
import { coinbaseApi } from "../util/coinbaseUtils";

interface ActiveStrategies {
  [key: string]: Set<string>;
}

export abstract class AbstractStrategy {
  private static activeStrategies: ActiveStrategies = {};

  static async subscribeToTicker(product_id: string) {
    const channel = {
      name: WebSocketChannelName.TICKER,
      product_ids: [product_id],
    };
    if (!this.activeStrategies[product_id]) {
      coinbaseApi.ws.subscribe(channel);
    }
  }

  static async placeMarketOrder(
    product_id: string,
    side: "BUY" | "SELL",
    size: string
  ) {
    try {
      const order = await coinbaseApi.rest.order.placeOrder({
        product_id,
        side: OrderSide[side],
        type: OrderType.MARKET,
        size,
      });
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  }

  static stop(product_id: string, strategy: string) {
    if (this.activeStrategies[product_id]) {
      this.removeActiveStrategy(product_id, strategy);
    }
    if (!this.activeStrategies[product_id]) {
      coinbaseApi.ws.unsubscribe({
        name: WebSocketChannelName.TICKER,
        product_ids: [product_id],
      });
    }
  }

  static addActiveStrategy(product_id: string, strategy: string) {
    if (this.activeStrategies[product_id]) {
      this.activeStrategies[product_id].add(strategy);
    } else {
      this.activeStrategies[product_id] = new Set([strategy]);
    }
    console.log(this.activeStrategies);
  }

  static removeActiveStrategy(product_id: string, strategy: string) {
    if (this.activeStrategies[product_id]) {
      this.activeStrategies[product_id].delete(strategy);
    }
    if (this.activeStrategies[product_id].size === 0) {
      delete this.activeStrategies[product_id];
    }
    console.log(this.activeStrategies);
  }

  static getActiveStrategies(product_id: string): string[] {
    console.log(this.activeStrategies);
    if (this.activeStrategies[product_id]) {
      return Array.from(this.activeStrategies[product_id]);
    } else {
      return [];
    }
  }

  static isActiveStrategy(product_id: string, strategy: string) {
    return this.activeStrategies[product_id]?.has(strategy);
  }
}
