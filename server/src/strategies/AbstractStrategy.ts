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
    const order = await coinbaseApi.rest.order.placeOrder({
      product_id,
      side: OrderSide[side],
      type: OrderType.MARKET,
      size,
    });
    console.log(order);
  }

  static stop(product_id: string, strategy: string) {
    if (this.activeStrategies[product_id]) {
      this.removeActiveStrategy(product_id, strategy);
    }
    console.log(this.getActiveStrategies());
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
  }

  static removeActiveStrategy(product_id: string, strategy: string) {
    if (this.activeStrategies[product_id]) {
      this.activeStrategies[product_id].delete(strategy);
    }
    if (this.activeStrategies[product_id].size === 0) {
      delete this.activeStrategies[product_id];
    }
  }

  static getActiveStrategies(): ActiveStrategies {
    return this.activeStrategies;
  }

  static isActiveStrategy(product_id: string, strategy: string) {
    return this.activeStrategies[product_id]?.has(strategy);
  }
}
