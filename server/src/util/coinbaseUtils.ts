import { Account, CoinbasePro, CoinbaseAccount } from "coinbase-pro-node";
import { type } from "os";

export const coinbaseApi = new CoinbasePro({
  apiKey: process.env.COINBASE_API_KEY as string,
  apiSecret: process.env.COINBASE_API_SECRET as string,
  passphrase: process.env.COINBASE_API_PASSPHRASE as string,
  useSandbox: true,
});

export const getActiveAccounts = async (service: "cb" | "pro") => {
  let accountType: "listAccounts" | "listCoinbaseAccounts";
  if (service === "cb") {
    accountType = "listCoinbaseAccounts";
  } else {
    accountType = "listAccounts";
  }
  let allAccounts =
    await await coinbaseApi.rest.account[accountType]();
  let activeAccounts = allAccounts.map((account) => {
    if (parseFloat(account.balance) > 0) {
      return {
        id: account.id,
        currency: account.currency,
        balance: account.balance
      }
    }
  }).filter(account => account !== undefined);

  return activeAccounts;
};
