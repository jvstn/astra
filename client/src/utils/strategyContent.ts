export type StrategyContent = {
  id: string;
  name: string;
  description: string;
  explanation: string;
  inputs: StrategyInput[];
};

type StrategyInput = {
  name: string;
  type: string;
  label: string;
  options?: StrategyInputOption[];
};

type StrategyInputOption = {
  label: string;
  value: string;
};

export const targetPriceContent = {
  id: "target-price",
  name: "Target Price",
  description: "Buy/Sell at a certain price",
  explanation: "Limit orders allow you to buy or sell at a certain price. If you create a buy order, you will buy at the price you specify or below. If you create a sell order, you will sell at the price you specify or above.",
  inputs: [
    { name: "price", type: "number", label: "Price" },
    { name: "size", type: "number", label: "Amount" },
    {
      name: "side",
      type: "select",
      label: "Side",
      options: [
        { value: "BUY", label: "BUY" },
        { value: "SELL", label: "SELL" },
      ],
    },
  ],
};

export const rsiContent = {
  id: "rsi",
  name: "Relative Strength",
  description: "Buy the dip, sell the peak",
  explanation: "Relative Strength Index  (RSI) is a momentum indicator that measures the speed and change of price movements. It is considered overbought when above 70 and oversold when below 30. A majority of price changes stay within the 70-30 range, what is referred to as 'in the paint' by traders. RSI help identify when trends are likely to continue and when they are likely to reverse.",
  inputs: [{ name: "interval", type: "number", label: "Interval" }],
};

export const bollingerBandsContent: StrategyContent = {
  id: "boll-bands",
  name: "Bollinger Bands",
  explanation: "Bollinger bands are a volatility indicator that measures the distance between the price and the average price over a specified number of periods. The indicator is calculated by subtracting the average price from the price and then dividing the result by the standard deviation of the price over the specified number of periods.",
  description: "Buy with in range of moving average",
  inputs: [{ name: "interval", type: "number", label: "Interval" }],
};
