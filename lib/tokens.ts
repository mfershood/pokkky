export type StockToken = {
  symbol: string;
  name: string;
  logo: string;
  address: `0x${string}`;
  oracleAddress: `0x${string}`;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  fdv: number;
  holders: number;
  oracleStatus: "live" | "delayed" | "stale";
  lastUpdate: string;
};

/**
 * Seed data shaped exactly like the payload the app expects from
 * Robinhood Chain's on-chain oracle registry + Chainlink price feeds.
 *
 * `logo` is the public logo of the underlying company/issuer (served via
 * Clearbit's free logo API, keyed by the company's domain). No API key
 * required. If you'd rather self-host, drop matching files in /public/logos
 * and point `logo` at e.g. "/logos/aapl.svg" instead.
 *
 * WIRE-UP: replace `getTokens()` / `getToken()` with real calls, e.g.
 *   - useReadContracts() against each token's Chainlink AggregatorV3 feed
 *   - a TanStack Query hook polling a Robinhood Chain indexer/subgraph
 * Never hardcode prices in production — this file exists only so the UI
 * has a realistic, correctly-typed shape to render while data wiring
 * is completed.
 */
export const STOCK_TOKENS: StockToken[] = [
  { symbol: "AAPL", name: "Apple Inc.", logo: "https://logo.clearbit.com/apple.com", address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", oracleAddress: "0xaa11bb22cc33dd44ee55ff66aa77bb88cc99dd00", price: 231.42, change24h: 1.84, volume24h: 84200000, marketCap: 3520000000000, fdv: 3520000000000, holders: 48231, oracleStatus: "live", lastUpdate: "12s ago" },
  { symbol: "NVDA", name: "NVIDIA Corp.", logo: "https://logo.clearbit.com/nvidia.com", address: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c", oracleAddress: "0xbb22cc33dd44ee55ff66aa77bb88cc99dd00ee11", price: 178.63, change24h: 3.27, volume24h: 121400000, marketCap: 4380000000000, fdv: 4380000000000, holders: 61980, oracleStatus: "live", lastUpdate: "8s ago" },
  { symbol: "TSLA", name: "Tesla Inc.", logo: "https://logo.clearbit.com/tesla.com", address: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d", oracleAddress: "0xcc33dd44ee55ff66aa77bb88cc99dd00ee11ff22", price: 342.18, change24h: -2.14, volume24h: 96700000, marketCap: 1090000000000, fdv: 1090000000000, holders: 39420, oracleStatus: "live", lastUpdate: "5s ago" },
  { symbol: "MSFT", name: "Microsoft Corp.", logo: "https://logo.clearbit.com/microsoft.com", address: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e", oracleAddress: "0xdd44ee55ff66aa77bb88cc99dd00ee11ff22aa33", price: 512.77, change24h: 0.62, volume24h: 45300000, marketCap: 3810000000000, fdv: 3810000000000, holders: 28110, oracleStatus: "live", lastUpdate: "14s ago" },
  { symbol: "AMZN", name: "Amazon.com Inc.", logo: "https://logo.clearbit.com/amazon.com", address: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f", oracleAddress: "0xee55ff66aa77bb88cc99dd00ee11ff22aa33bb44", price: 228.91, change24h: 1.11, volume24h: 51200000, marketCap: 2410000000000, fdv: 2410000000000, holders: 31554, oracleStatus: "live", lastUpdate: "9s ago" },
  { symbol: "META", name: "Meta Platforms", logo: "https://logo.clearbit.com/meta.com", address: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a", oracleAddress: "0xff66aa77bb88cc99dd00ee11ff22aa33bb44cc55", price: 689.34, change24h: -0.87, volume24h: 38900000, marketCap: 1750000000000, fdv: 1750000000000, holders: 22983, oracleStatus: "delayed", lastUpdate: "41s ago" },
  { symbol: "GOOGL", name: "Alphabet Inc.", logo: "https://logo.clearbit.com/google.com", address: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b", oracleAddress: "0x11aa22bb33cc44dd55ee66ff77aa88bb99cc00dd", price: 201.05, change24h: 0.94, volume24h: 33100000, marketCap: 2470000000000, fdv: 2470000000000, holders: 19832, oracleStatus: "live", lastUpdate: "11s ago" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", logo: "https://logo.clearbit.com/invesco.com", address: "0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c", oracleAddress: "0x22bb33cc44dd55ee66ff77aa88bb99cc00dd11ee", price: 512.60, change24h: 0.48, volume24h: 28700000, marketCap: 312000000000, fdv: 312000000000, holders: 15207, oracleStatus: "live", lastUpdate: "16s ago" },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", logo: "https://logo.clearbit.com/ssga.com", address: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d", oracleAddress: "0x33cc44dd55ee66ff77aa88bb99cc00dd11ee22ff", price: 648.22, change24h: 0.31, volume24h: 41800000, marketCap: 598000000000, fdv: 598000000000, holders: 27461, oracleStatus: "live", lastUpdate: "7s ago" }
];

export function getTokens(): StockToken[] {
  return STOCK_TOKENS;
}

export function getToken(symbol: string): StockToken | undefined {
  return STOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());
}

export function searchTokens(query: string): StockToken[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return STOCK_TOKENS.filter(
    (t) => t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
  );
}
