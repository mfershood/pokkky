"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Radio } from "lucide-react";
import FearGreedMeter from "@/components/FearGreedMeter";
import TokenLogo from "@/components/TokenLogo";
import { getTokens } from "@/lib/tokens";
import { formatCompact, formatPct, cx } from "@/lib/utils";

export default function AnalyticsPage() {
  const tokens = getTokens();

  const gainers = useMemo(() => [...tokens].sort((a, b) => b.change24h - a.change24h).slice(0, 4), [tokens]);
  const losers = useMemo(() => [...tokens].sort((a, b) => a.change24h - b.change24h).slice(0, 4), [tokens]);
  const mostTraded = useMemo(() => [...tokens].sort((a, b) => b.volume24h - a.volume24h), [tokens]);

  const sentimentScore = 64;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Analytics</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Market-wide sentiment, leaderboards, and oracle health across every
          tokenized stock on Robinhood Chain.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-card p-6 lg:col-span-1">
          <h2 className="text-sm font-medium text-ink-muted">Fear &amp; Greed</h2>
          <div className="mt-2">
            <FearGreedMeter value={sentimentScore} />
          </div>
        </div>

        <div className="glass rounded-card p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <Activity size={14} className="text-mind" /> AI market sentiment
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            Momentum is tilted toward risk-on: semiconductor and AI-linked
            names are leading volume, while defensive index tokens trade in a
            tight range. Oracle latency remains low across the majority of
            feeds, supporting tight spreads on the swap terminal.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Momentum", "Bullish"],
              ["Volatility", "Moderate"],
              ["Breadth", "6 of 9 up"],
              ["Oracle health", "98.6%"]
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-ink-muted">{label}</p>
                <p className="mt-1 font-mono text-sm text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Leaderboard title="Top gainers" icon={<TrendingUp size={14} className="text-gain" />} tokens={gainers} />
        <Leaderboard title="Top losers" icon={<TrendingDown size={14} className="text-loss" />} tokens={losers} />
      </div>

      <div className="glass mt-6 rounded-card p-6">
        <h2 className="text-sm font-medium text-ink-muted">Volume leaderboard</h2>
        <div className="mt-4 space-y-3">
          {mostTraded.map((t, i) => {
            const pct = (t.volume24h / mostTraded[0].volume24h) * 100;
            return (
              <div key={t.symbol} className="flex items-center gap-3">
                <span className="w-5 font-mono text-xs text-ink-faint">{i + 1}</span>
                <TokenLogo src={t.logo} symbol={t.symbol} size={22} rounded="rounded-md" />
                <span className="w-16 font-mono text-sm">{t.symbol}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-pill bg-surface">
                  <motion.div
                    className="h-full rounded-pill bg-mind"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                </div>
                <span className="w-20 text-right font-mono text-xs text-ink-muted">
                  ${formatCompact(t.volume24h)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass mt-6 rounded-card p-6">
        <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
          <Radio size={14} className="text-mind" /> Oracle health monitor
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.map((t) => (
            <div key={t.symbol} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <span className="flex items-center gap-2 font-mono text-sm">
                <TokenLogo src={t.logo} symbol={t.symbol} size={22} rounded="rounded-md" />
                {t.symbol}
              </span>
              <span
                className={cx(
                  "flex items-center gap-1.5 text-xs",
                  t.oracleStatus === "live" ? "text-mind" : "text-loss"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {t.oracleStatus} · {t.lastUpdate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Leaderboard({
  title,
  icon,
  tokens
}: {
  title: string;
  icon: React.ReactNode;
  tokens: ReturnType<typeof getTokens>;
}) {
  return (
    <div className="glass rounded-card p-6">
      <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
        {icon} {title}
      </h2>
      <div className="mt-4 space-y-3">
        {tokens.map((t) => (
          <div key={t.symbol} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <TokenLogo src={t.logo} symbol={t.symbol} size={22} rounded="rounded-md" />
              <span className="font-mono">{t.symbol}</span>
            </span>
            <span className={cx("font-mono", t.change24h >= 0 ? "text-gain" : "text-loss")}>
              {formatPct(t.change24h)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
