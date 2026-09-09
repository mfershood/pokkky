import { http, createConfig } from "wagmi";
import { defineChain } from "viem";

/**
 * Robinhood Chain network definition.
 * Replace `rpcUrl` and `explorerUrl` with the official production endpoints
 * once you have access to them — these are placeholders wired for local dev.
 */
export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Robinhood ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RH_RPC_URL || "https://rpc.robinhoodchain.example"] }
  },
  blockExplorers: {
    default: {
      name: "RH Explorer",
      url: process.env.NEXT_PUBLIC_RH_EXPLORER_URL || "https://explorer.robinhoodchain.example"
    }
  },
  testnet: false
});

export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  transports: {
    [robinhoodChain.id]: http()
  },
  ssr: true
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
