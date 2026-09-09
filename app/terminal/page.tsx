"use client";

import { motion } from "framer-motion";
import AISearchBar from "@/components/AISearchBar";
import SwapWidget from "@/components/SwapWidget";

export default function TerminalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Terminal</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Ask StockMind AI to find any tokenized stock, then swap directly from
          the terminal.
        </p>
      </motion.div>

      <div className="mt-8 max-w-xl">
        <AISearchBar large />
      </div>

      <div className="mt-10">
        <SwapWidget />
      </div>
    </div>
  );
}
