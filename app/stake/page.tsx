"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Gift } from "lucide-react";
import { getTokens } from "@/lib/tokens";
import { formatUSD, cx } from "@/lib/utils";

const LOCK_PERIODS = [
  { label: "Flexible", days: 0, apy: 4.2 },
  { label: "30 days", days: 30, apy: 8.6 },
  { label: "90 days", days: 90, apy: 14.3 },
  { label: "180 days", days: 180, apy: 21.9 }
];

const REWARD_HISTORY = [
  { date: "Sep 8", amount: 12.4 },
  { date: "Sep 7", amount: 11.9 },
  { date: "Sep 6", amount: 13.1 },
  { date: "Sep 5", amount: 10.8 }
];

export default function StakePage() {
  const tokens = getTokens();
  const [asset, setAsset] = useState(tokens[0].symbol);
  const [lockIndex, setLockIndex] = useState(1);
  const [amount, setAmount] = useState("");

  const lock = LOCK_PERIODS[lockIndex];
  const token = tokens.find((t) => t.symbol === asset)!;

  const totalStaked = 48200000;
  const pendingRewards = 342.18;

  const projected = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    return (amt * token.price * (lock.apy / 100)) / 12;
  }, [amount, lock, token]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Robinhood Rewards</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Stake tokenized stocks and earn rewards in $MIND. Rewards accrue and
          are calculated entirely on-chain.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Total staked" value={`$${totalStaked.toLocaleString()}`} />
        <Metric label="Current APY" value={`${lock.apy}%`} accent />
        <Metric label="Pending rewards" value={`${pendingRewards} $MIND`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-card p-6">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <Lock size={14} className="text-mind" /> Stake an asset
          </h2>

          <div className="mt-4">
            <label className="text-xs text-ink-muted">Asset</label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 font-mono text-sm outline-none"
            >
              {tokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol} — {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="text-xs text-ink-muted">Amount</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0.0"
                className="w-full bg-transparent font-mono text-lg outline-none"
              />
              <button onClick={() => setAmount("100")} className="text-xs text-mind">
                MAX
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs text-ink-muted">Lock period</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LOCK_PERIODS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setLockIndex(i)}
                  className={cx(
                    "rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors",
                    lockIndex === i
                      ? "border-mind/50 bg-mind/10 text-mind"
                      : "border-border text-ink-muted"
                  )}
                >
                  {p.label}
                  <span className="mt-0.5 block font-mono text-[11px]">{p.apy}% APY</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Est. monthly rewards</span>
              <span className="font-mono text-mind">{formatUSD(projected)}</span>
            </div>
          </div>

          <button
            disabled={!amount}
            className="mt-5 w-full rounded-pill bg-mind py-3.5 text-sm font-semibold text-void enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!amount ? "Enter an amount" : `Stake ${asset}`}
          </button>
        </div>

        <div className="glass rounded-card p-6">
          <h2 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <Gift size={14} className="text-mind" /> Rewards
          </h2>
          <div className="mt-4 rounded-xl border border-mind/20 bg-mind/5 p-4">
            <p className="text-xs text-ink-muted">Claimable now</p>
            <p className="mt-1 font-mono text-2xl text-mind">{pendingRewards} $MIND</p>
            <button className="mt-4 w-full rounded-pill border border-mind/40 py-2.5 text-sm font-medium text-mind hover:bg-mind/10">
              Claim rewards
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs text-ink-muted">Reward history</p>
            <div className="mt-3 space-y-2.5">
              {REWARD_HISTORY.map((r) => (
                <div key={r.date} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{r.date}</span>
                  <span className="font-mono text-ink">+{r.amount} $MIND</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass rounded-card p-5">
      <p className="text-xs text-ink-muted">{label}</p>
      <p className={cx("mt-2 font-mono text-xl font-medium", accent ? "text-mind" : "text-ink")}>{value}</p>
    </div>
  );
}
