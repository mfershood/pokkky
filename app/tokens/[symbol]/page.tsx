import { notFound } from "next/navigation";
import { getToken, getTokens } from "@/lib/tokens";
import { formatCompact, formatUSD, formatPct, truncateAddress } from "@/lib/utils";
import CandlestickChart from "@/components/CandlestickChart";
import TokenLogo from "@/components/TokenLogo";
import { cx } from "@/lib/utils";
import { ExternalLink, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return getTokens().map((t) => ({ symbol: t.symbol }));
}

const MOCK_TXS = [
  { hash: "0x8f2a...c410", type: "Swap", amount: "12.4", time: "2m ago" },
  { hash: "0x1b9e...aa02", type: "Stake", amount: "84.0", time: "9m ago" },
  { hash: "0xde77...5f31", type: "Swap", amount: "3.2", time: "14m ago" },
  { hash: "0x44cd...9b18", type: "Unstake", amount: "20.0", time: "26m ago" }
];

export default function TokenDetailPage({ params }: { params: { symbol: string } }) {
  const token = getToken(params.symbol);
  if (!token) return notFound();

  const positive = token.change24h >= 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <TokenLogo src={token.logo} symbol={token.symbol} size={64} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">{token.name}</h1>
            <p className="font-mono text-sm text-ink-muted">{token.symbol} · Robinhood Chain</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-3xl font-medium">{formatUSD(token.price)}</p>
          <p className={cx("font-mono text-sm", positive ? "text-gain" : "text-loss")}>
            {formatPct(token.change24h)} · 24H
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass rounded-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-ink-muted">Price chart</h2>
            <span
              className={cx(
                "flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-medium",
                token.oracleStatus === "live" ? "bg-mind/10 text-mind" : "bg-loss/10 text-loss"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              Oracle {token.oracleStatus} · {token.lastUpdate}
            </span>
          </div>
          <div className="mt-4">
            <CandlestickChart basePrice={token.price} />
          </div>
        </div>

        <div className="glass rounded-card p-6">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <Sparkles size={14} className="text-mind" /> AI summary
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {token.symbol} is trading {positive ? "higher" : "lower"} over the past 24
            hours on {formatCompact(token.volume24h)} in volume, with the on-chain oracle
            reporting a {token.oracleStatus} feed. Market cap sits near{" "}
            {formatCompact(token.marketCap)}, tracked across{" "}
            {token.holders.toLocaleString()} on-chain holders.
          </p>
          <div className="mt-6 space-y-3 border-t border-border/60 pt-4 text-sm">
            {[
              ["Market Cap", `$${formatCompact(token.marketCap)}`],
              ["FDV", `$${formatCompact(token.fdv)}`],
              ["24H Volume", `$${formatCompact(token.volume24h)}`],
              ["Holders", token.holders.toLocaleString()]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-ink-muted">{label}</span>
                <span className="font-mono text-ink">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-card p-6">
          <h2 className="text-sm font-medium text-ink-muted">Contract details</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Token contract</span>
              <a href="#" className="flex items-center gap-1 font-mono text-mind">
                {truncateAddress(token.address)} <ExternalLink size={12} />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Oracle address</span>
              <a href="#" className="flex items-center gap-1 font-mono text-mind">
                {truncateAddress(token.oracleAddress)} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="glass rounded-card p-6">
          <h2 className="text-sm font-medium text-ink-muted">Recent transactions</h2>
          <div className="mt-4 space-y-3 text-sm">
            {MOCK_TXS.map((tx) => (
              <div key={tx.hash} className="flex items-center justify-between font-mono text-xs">
                <span className="text-mind">{tx.hash}</span>
                <span className="text-ink-muted">{tx.type}</span>
                <span>{tx.amount} {token.symbol}</span>
                <span className="text-ink-faint">{tx.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
