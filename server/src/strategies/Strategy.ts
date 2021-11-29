import { OrderSide, OrderType, WebSocketChannelName } from "coinbase-pro-node";
import { coinbaseApi } from "../util/coinbaseUtils";

export class Strategy {

  
  static async subscribeToTicker(product_id: string) {
    const channel = {
      name: WebSocketChannelName.TICKER,
      product_ids: [product_id],
    };

    coinbaseApi.ws.subscribe(channel);
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

  static stop(product_id: string) {
    coinbaseApi.ws.unsubscribe({
      name: WebSocketChannelName.TICKER,
      product_ids: [product_id],
    });
  }

}