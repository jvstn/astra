import axios from "axios";
import { format } from "date-fns";

export const getProductData = async (product_id: string) => {
  
  const { data } = await axios.get(
    `https://api-public.sandbox.exchange.coinbase.com/products/${product_id}/candles/`,
    {
      params: {
        granularity: "60",
      },
    }
  );
  let dates: string[] = [];
  let prices: number[] = [];
  data.forEach((ohlc: any) => {
    const timestamp = new Date(ohlc[0] * 1000);
    dates.push(format(timestamp, "MMM-dd-yyyy HH:mm"));
    prices.push(ohlc[4]);
  });
  
  return { dates, prices };
}