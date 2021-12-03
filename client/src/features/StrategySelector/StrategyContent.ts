export type StrategyContent = {
  id: string;
  name: string;
  description: string;
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

export const limitOrderContent = {
  id: "target-price",
  name: "Target Price",
  description: "Buy at certain price",
  inputs: [
    { name: "price", type: "number", label: "Price" },
    { name: "size", type: "number", label: "Amount" },
    {
      name: "side",
      type: "select",
      label: "Side",
      options: [
        { value: "BUY", label: "Buy" },
        { value: "SELL", label: "Sell" },
      ],
    },
  ],
};

export const rsiContent = {
  id: "rsi",
  name: "Relative Strength",
  description: "Buy when oversold, sell when overbought",
  inputs: [{ name: "interval", type: "number", label: "Interval" }],
};

export const bollingerBandsContent: StrategyContent = {
  id: "boll-bands",
  name: "Bollinger Bands",
  description: "Buy with in range of moving average",
  inputs: [{ name: "interval", type: "number", label: "Interval" }],
};
