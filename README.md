# StockMind AI

**The AI Terminal for Tokenized Markets** — a premium Web3 frontend for
trading tokenized US stocks on Robinhood Chain (chain ID 4663).

## Stack

Next.js 15 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion
· wagmi · viem · RainbowKit · Recharts · TanStack Query

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your RPC + WalletConnect project ID
npm run dev
```

## What's real vs. mocked

This is a complete, production-shaped frontend. To keep it runnable without
your specific chain/oracle credentials, a few pieces are mocked and clearly
marked with `WIRE-UP:` comments in the source:

| Area | File | What to wire up |
|---|---|---|
| Token prices, volume, market cap | `lib/tokens.ts` | Replace `STOCK_TOKENS` with a query against your Chainlink aggregators / on-chain oracle registry via wagmi's `useReadContracts`, or an indexer/subgraph. |
| Network config | `lib/wagmi.ts` | Set the real Robinhood Chain RPC URL and block explorer via `.env.local`. |
| Candlestick history | `components/CandlestickChart.tsx` | Swap the generator for real OHLC candles from your indexer. |
| Swap execution | `components/SwapWidget.tsx` | Call your router contract's swap function with wagmi's `useWriteContract`, await the receipt, replace the quote math with a real on-chain quoter. |
| Portfolio holdings | `app/portfolio/page.tsx` | Replace mock holdings with `balanceOf` reads across each token contract for the connected address. |
| Staking | `app/stake/page.tsx` | Wire stake/unstake/claim to your staking contract; APY and totals should be read on-chain. |
| Voice search | `components/AISearchBar.tsx` | Swap the placeholder timer for the Web Speech API (`SpeechRecognition`). |

**Never ship fake prices to production** — every mocked value above is
isolated to its own file so it's a one-place swap, not a scavenger hunt.

## Structure

```
app/            routes (home, markets, tokens/[symbol], portfolio, stake, analytics, terminal, docs)
components/     Navbar, Footer, AIOrb, ParticleNetwork, TokenCard, SwapWidget, charts, etc.
lib/            tokens.ts (data shape + mock feed), wagmi.ts (chain config), utils.ts
```

## Token logos

Company/issuer logos are pulled live from [Clearbit's free logo API](https://clearbit.com/logo)
by domain (e.g. `https://logo.clearbit.com/apple.com`) — no API key needed.
`components/TokenLogo.tsx` renders them with a fallback to the ticker's
initials if a logo ever fails to load. To self-host instead, drop files in
`public/logos/` and point each token's `logo` field in `lib/tokens.ts` at
e.g. `/logos/aapl.svg`.

## Design system

- Background `#070707`, accent `#D4FF00`, 28px card radius, glassmorphism
  (`.glass` / `.glass-strong` in `globals.css`).
- Display type: Space Grotesk. Data/mono type: JetBrains Mono (prices,
  addresses, tickers).
- Motion: Framer Motion for entrance/hover states, native CSS keyframes for
  the orbiting hero and ticker tape. Respects `prefers-reduced-motion`.
