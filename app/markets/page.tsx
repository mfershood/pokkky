"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import TokenCard from "@/components/TokenCard";
import AISearchBar from "@/components/AISearchBar";
import { getTokens } from "@/lib/tokens";
import { cx } from "@/lib/utils";

type SortKey = "marketCap" | "price" | "change24h" | "volume24h";

export default function MarketsPage() {
  const tokens = getTokens();
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [dir, setDir] = useState<1 | -1>(-1);

  const sorted = useMemo(
    () => [...tokens].sort((a, b) => (a[sortKey] - b[sortKey]) * dir),
    [tokens, sortKey, dir]
  );

  function toggleSort(key: SortKey) {
    if (key === sortKey) setDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(key);
      setDir(-1);
    }
  }

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "marketCap", label: "Market Cap" },
    { key: "price", label: "Price" },
    { key: "change24h", label: "24H Change" },
    { key: "volume24h", label: "Volume" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Markets</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Live tokenized US equities on Robinhood Chain, priced continuously via
          on-chain Chainlink oracle feeds.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md flex-1">
          <AISearchBar />
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => toggleSort(opt.key)}
              className={cx(
                "flex items-center gap-1.5 rounded-pill border px-3.5 py-2 text-xs font-medium transition-colors",
                sortKey === opt.key
                  ? "border-mind/40 bg-mind/10 text-mind"
                  : "border-border text-ink-muted hover:text-ink"
              )}
            >
              {opt.label}
              {sortKey === opt.key && <ArrowDownUp size={12} />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((token, i) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <TokenCard token={token} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
