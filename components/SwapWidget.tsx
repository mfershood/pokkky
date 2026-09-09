"use client";

import { useMemo, useState } from "react";
import { ArrowDown, Settings, Info } from "lucide-react";
import { getTokens } from "@/lib/tokens";
import { formatUSD, cx } from "@/lib/utils";

export default function SwapWidget() {
  const tokens = getTokens();
  const [fromSymbol, setFromSymbol] = useState(tokens[0].symbol);
  const [toSymbol, setToSymbol] = useState(tokens[1].symbol);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fromToken = tokens.find((t) => t.symbol === fromSymbol)!;
  const toToken = tokens.find((t) => t.symbol === toSymbol)!;

  const quote = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const usdValue = amt * fromToken.price;
    const received = usdValue / toToken.price;
    const priceImpact = Math.min(0.02 + amt / 100000, 4.8);
    const gasEstimate = 0.00042;
    return { usdValue, received, priceImpact, gasEstimate };
  }, [amount, fromToken, toToken]);

  function swapDirection() {
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
  }

  return (
    <div className="glass-strong relative mx-auto w-full max-w-md rounded-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-ink-muted">Swap</h2>
        <button
          onClick={() => setShowSettings((v) => !v)}
          className="rounded-lg p-1.5 text-ink-muted hover:text-mind"
          aria-label="Slippage settings"
        >
          <Settings size={16} />
        </button>
      </div>

      {showSettings && (
        <div className="mt-3 rounded-xl border border-border p-3">
          <p className="text-xs text-ink-muted">Slippage tolerance</p>
          <div className="mt-2 flex gap-2">
            {[0.1, 0.5, 1].map((s) => (
              <button
                key={s}
                onClick={() => setSlippage(s)}
                className={cx(
                  "rounded-pill px-3 py-1.5 text-xs font-medium",
                  slippage === s ? "bg-mind text-void" : "bg-surface text-ink-muted"
                )}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* From */}
      <div className="mt-4 rounded-2xl border border-border bg-surface/60 p-4">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>From</span>
          <button onClick={() => setAmount("1000")} className="text-mind hover:underline">
            Max: 1,000.00
          </button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.0"
            className="w-full bg-transparent font-mono text-2xl outline-none placeholder:text-ink-faint"
          />
          <TokenSelect
            value={fromSymbol}
            onChange={setFromSymbol}
            options={tokens}
            exclude={toSymbol}
          />
        </div>
        <p className="mt-1 text-xs text-ink-faint">≈ {formatUSD(quote.usdValue)}</p>
      </div>

      {/* Swap direction */}
      <div className="relative z-10 -my-3 flex justify-center">
        <button
          onClick={swapDirection}
          className="glass-strong flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:rotate-180"
          aria-label="Reverse swap direction"
        >
          <ArrowDown size={16} className="text-mind" />
        </button>
      </div>

      {/* To */}
      <div className="rounded-2xl border border-border bg-surface/60 p-4">
        <span className="text-xs text-ink-muted">To (estimated)</span>
        <div className="mt-2 flex items-center gap-3">
          <p className="w-full truncate font-mono text-2xl text-ink">
            {quote.received > 0 ? quote.received.toFixed(4) : "0.0"}
          </p>
          <TokenSelect
            value={toSymbol}
            onChange={setToSymbol}
            options={tokens}
            exclude={fromSymbol}
          />
        </div>
        <p className="mt-1 text-xs text-ink-faint">≈ {formatUSD(quote.received * toToken.price)}</p>
      </div>

      {/* Quote details */}
      <div className="mt-4 space-y-2 rounded-xl border border-border p-4 text-xs">
        <Row label="Price" value={`1 ${fromToken.symbol} = ${(fromToken.price / toToken.price).toFixed(4)} ${toToken.symbol}`} />
        <Row
          label="Price impact"
          value={`${quote.priceImpact.toFixed(2)}%`}
          warn={quote.priceImpact > 3}
        />
        <Row label="Slippage tolerance" value={`${slippage}%`} />
        <Row label="Estimated gas" value={`${quote.gasEstimate} ETH`} />
      </div>

      <button
        disabled={!amount || parseFloat(amount) <= 0}
        onClick={() => setShowConfirm(true)}
        className="mt-5 w-full rounded-pill bg-mind py-3.5 text-sm font-semibold text-void transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {!amount ? "Enter an amount" : `Swap ${fromToken.symbol} → ${toToken.symbol}`}
      </button>

      {showConfirm && (
        <ConfirmModal
          fromToken={fromToken}
          toToken={toToken}
          amount={amount}
          received={quote.received}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

function Row({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1 text-ink-muted">
        {label} {warn && <Info size={11} className="text-loss" />}
      </span>
      <span className={cx("font-mono", warn ? "text-loss" : "text-ink")}>{value}</span>
    </div>
  );
}

function TokenSelect({
  value,
  onChange,
  options,
  exclude
}: {
  value: string;
  onChange: (v: string) => void;
  options: ReturnType<typeof getTokens>;
  exclude: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="shrink-0 rounded-pill border border-border bg-surface px-3 py-2 font-mono text-sm outline-none"
    >
      {options
        .filter((t) => t.symbol !== exclude)
        .map((t) => (
          <option key={t.symbol} value={t.symbol}>
            {t.symbol}
          </option>
        ))}
    </select>
  );
}

function ConfirmModal({
  fromToken,
  toToken,
  amount,
  received,
  onClose
}: {
  fromToken: ReturnType<typeof getTokens>[number];
  toToken: ReturnType<typeof getTokens>[number];
  amount: string;
  received: number;
  onClose: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={onClose}>
      <div
        className="glass-strong w-full max-w-sm rounded-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {!confirmed ? (
          <>
            <h3 className="text-lg font-semibold">Confirm swap</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">You pay</span>
                <span className="font-mono">{amount} {fromToken.symbol}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">You receive</span>
                <span className="font-mono">{received.toFixed(4)} {toToken.symbol}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-faint">
              WIRE-UP: this button should call your router contract's swap
              function via wagmi's useWriteContract, then await the tx receipt.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-pill border border-border py-3 text-sm">
                Cancel
              </button>
              <button
                onClick={() => setConfirmed(true)}
                className="flex-1 rounded-pill bg-mind py-3 text-sm font-semibold text-void"
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mind/10 text-mind">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-semibold">Swap submitted</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {amount} {fromToken.symbol} → {received.toFixed(4)} {toToken.symbol}
            </p>
            <button onClick={onClose} className="mt-6 w-full rounded-pill bg-mind py-3 text-sm font-semibold text-void">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
