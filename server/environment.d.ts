declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COINBASE_API_SECRET: string;
      COINBASE_API_KEY: string;
      COINBASE_API_PASSPHRASE: string;
      JWT_SECRET: string;
    }
  }
}

export { };