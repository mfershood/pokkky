"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import PortfolioDonut from "@/components/PortfolioDonut";
import WalletConnectButton from "@/components/WalletConnectButton";
import TokenLogo from "@/components/TokenLogo";
import { getTokens } from "@/lib/tokens";
import { formatUSD, formatPct, cx } from "@/lib/utils";

/**
 * WIRE-UP: replace this with real balances read via wagmi's
 * useReadContracts (balanceOf across each token contract for
 * `address`), joined with live prices from lib/tokens.
 */
function useMockHoldings() {
  const tokens = getTokens();
  return useMemo(
    () =>
      [tokens[0], tokens[1], tokens[2], tokens[4]].map((t, i) => ({
        ...t,
        qty: [12.4, 38.2, 5.1, 21.7][i],
        costBasis: [198.2, 132.5, 401.0, 205.3][i]
      })),
    [tokens]
  );
}

export default function PortfolioPage() {
  const { isConnected } = useAccount();
  const holdings = useMockHoldings();

  const totalValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.qty * h.costBasis, 0);
  const pnl = totalValue - totalCost;
  const pnlPct = (pnl / totalCost) * 100;

  const donutData = holdings.map((h) => ({ name: h.symbol, value: h.qty * h.price }));
  const best = [...holdings].sort((a, b) => b.change24h - a.change24h)[0];
  const worst = [...holdings].sort((a, b) => a.change24h - b.change24h)[0];

  const perf = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        value: totalValue * (0.9 + Math.sin(i / 4) * 0.03 + i * 0.0035)
      })),
    [totalValue]
  );

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold">Connect your wallet</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Connect a wallet to view your on-chain stock token portfolio, PnL, and allocation.
        </p>
        <div className="mt-6">
          <WalletConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        AI Portfolio
      </motion.h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Total value" value={formatUSD(totalValue)} />
        <Metric
          label="Unrealized PnL"
          value={`${pnl >= 0 ? "+" : ""}${formatUSD(pnl)} (${formatPct(pnlPct)})`}
          positive={pnl >= 0}
        />
        <Metric label="Best performer" value={`${best.symbol} ${formatPct(best.change24h)}`} positive />
        <Metric label="Worst performer" value={`${worst.symbol} ${formatPct(worst.change24h)}`} positive={false} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass rounded-card p-6">
          <h2 className="text-sm font-medium text-ink-muted">Daily performance</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perf} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="perfFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4FF00" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#D4FF00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "#8B8D85", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8B8D85", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  formatter={(v: number) => formatUSD(v)}
                />
                <Area type="monotone" dataKey="value" stroke="#D4FF00" strokeWidth={2} fill="url(#perfFill)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-card p-6">
          <h2 className="text-sm font-medium text-ink-muted">Allocation</h2>
          <PortfolioDonut data={donutData} />
        </div>
      </div>

      <div className="glass mt-6 overflow-x-auto rounded-card p-6">
        <h2 className="text-sm font-medium text-ink-muted">Holdings</h2>
        <table className="mt-4 w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="text-xs text-ink-muted">
              <th className="pb-3 font-normal">Asset</th>
              <th className="pb-3 font-normal">Qty</th>
              <th className="pb-3 font-normal">Price</th>
              <th className="pb-3 font-normal">24H</th>
              <th className="pb-3 font-normal">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {holdings.map((h) => (
              <tr key={h.symbol}>
                <td className="py-3">
                  <span className="flex items-center gap-2">
                    <TokenLogo src={h.logo} symbol={h.symbol} size={24} rounded="rounded-md" />
                    <span className="font-mono">{h.symbol}</span>
                  </span>
                </td>
                <td className="py-3 font-mono">{h.qty}</td>
                <td className="py-3 font-mono">{formatUSD(h.price)}</td>
                <td className={cx("py-3 font-mono", h.change24h >= 0 ? "text-gain" : "text-loss")}>
                  {formatPct(h.change24h)}
                </td>
                <td className="py-3 font-mono">{formatUSD(h.qty * h.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  positive
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="glass rounded-card p-5">
      <p className="text-xs text-ink-muted">{label}</p>
      <p
        className={cx(
          "mt-2 font-mono text-lg font-medium",
          positive === undefined ? "text-ink" : positive ? "text-gain" : "text-loss"
        )}
      >
        {value}
      </p>
    </div>
  );
}
