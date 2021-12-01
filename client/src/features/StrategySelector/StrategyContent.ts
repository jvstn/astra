export type StrategyContent = {
  name: string;
  description: string;
  inputs: StrategyInput[];
}

type StrategyInput = {
  name: string;
  type: string;
  label: string;
  options?: StrategyInputOption[];
}

type StrategyInputOption = {
  label: string;
  value: string;
}


export const limitOrderContent = {
  name: "Limit Order",
  description: "Limit Order",
  inputs: [
    { name: "price", type: "number", label: "Price" },
    { name: "amount", type: "number", label: "Amount" },
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
  name: "RSI",
  description: "Relative Strength Index",
  inputs: [{ name: "interval", type: "number", label: "Interval" }],
};

export const bollingerBandsContent: StrategyContent = {
  name: "Bollinger Bands",
  description: "Bollinger Bands",
  inputs: [
    { name: "interval", type: "number", label: "Interval" },
  ],
};
