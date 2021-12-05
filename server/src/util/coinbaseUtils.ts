import { Account, CoinbasePro, CoinbaseAccount } from "coinbase-pro-node";
import { type } from "os";

export const coinbaseApi = new CoinbasePro({
  apiKey: process.env.COINBASE_API_KEY as string,
  apiSecret: process.env.COINBASE_API_SECRET as string,
  passphrase: process.env.COINBASE_API_PASSPHRASE as string,
  useSandbox: true,
});

