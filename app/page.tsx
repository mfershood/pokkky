"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ParticleNetwork from "@/components/ParticleNetwork";
import AIOrb from "@/components/AIOrb";
import StatCard from "@/components/StatCard";
import AISearchBar from "@/components/AISearchBar";
import WalletConnectButton from "@/components/WalletConnectButton";
import { getTokens } from "@/lib/tokens";
import TokenLogo from "@/components/TokenLogo";

export default function HomePage() {
  const tokens = getTokens();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="relative">
        <ParticleNetwork />

        <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-2 lg:items-center lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-mind/30 bg-mind/10 px-4 py-1.5 text-xs font-medium text-mind">
              <Sparkles size={13} /> Live on Robinhood Chain · Chain ID 4663
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              The AI terminal for
              <br />
              <span className="text-gradient-mind">tokenized markets.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
              Trade tokenized US equities directly on-chain. Real-time
              Chainlink-fed pricing, AI-native search, and one-click swaps —
              built for Robinhood Chain.
            </p>

            <div className="mt-8">
              <AISearchBar />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/markets"
                className="group flex items-center gap-2 rounded-pill bg-mind px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02] active:scale-95"
              >
                Launch App
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <WalletConnectButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <AIOrb />
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Value Locked" value={284300000} prefix="$" decimals={0} />
            <StatCard label="24H Volume" value={61800000} prefix="$" decimals={0} />
            <StatCard label="Active Traders" value={18420} decimals={0} />
            <StatCard label="Stock Tokens" value={tokens.length} decimals={0} live={false} />
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-4">
          <div className="flex animate-ticker gap-10 whitespace-nowrap font-mono text-sm">
            {[...tokens, ...tokens].map((t, i) => (
              <span key={i} className="flex items-center gap-2 px-2 text-ink-muted">
                <TokenLogo src={t.logo} symbol={t.symbol} size={20} rounded="rounded-md" />
                <span className="text-ink">{t.symbol}</span>
                <span>${t.price.toFixed(2)}</span>
                <span className={t.change24h >= 0 ? "text-gain" : "text-loss"}>
                  {t.change24h >= 0 ? "+" : ""}
                  {t.change24h.toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
