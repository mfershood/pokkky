"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatCompact, formatPct, formatUSD } from "@/lib/utils";
import type { StockToken } from "@/lib/tokens";
import { cx } from "@/lib/utils";
import TokenLogo from "./TokenLogo";

export default function TokenCard({ token }: { token: StockToken }) {
  const positive = token.change24h >= 0;

  return (
    <Link href={`/tokens/${token.symbol}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="glass group rounded-card p-5 transition-colors hover:border-mind/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TokenLogo src={token.logo} symbol={token.symbol} size={40} />
            <div>
              <p className="text-sm font-medium">{token.name}</p>
              <p className="font-mono text-xs text-ink-muted">{token.symbol}</p>
            </div>
          </div>
          <span
            className={cx(
              "flex items-center gap-1 rounded-pill px-2 py-1 text-[10px] font-medium",
              token.oracleStatus === "live"
                ? "bg-mind/10 text-mind"
                : "bg-loss/10 text-loss"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {token.oracleStatus}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <p className="font-mono text-2xl font-medium">{formatUSD(token.price)}</p>
          <p className={cx("font-mono text-sm font-medium", positive ? "text-gain" : "text-loss")}>
            {formatPct(token.change24h)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-xs text-ink-muted">
          <div>
            <p>24H Volume</p>
            <p className="mt-1 font-mono text-ink">${formatCompact(token.volume24h)}</p>
          </div>
          <div>
            <p>Market Cap</p>
            <p className="mt-1 font-mono text-ink">${formatCompact(token.marketCap)}</p>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-ink-faint">Updated {token.lastUpdate}</p>
      </motion.div>
    </Link>
  );
}
