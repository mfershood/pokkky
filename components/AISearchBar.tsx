"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic } from "lucide-react";
import { searchTokens } from "@/lib/tokens";
import { cx } from "@/lib/utils";
import TokenLogo from "./TokenLogo";

export default function AISearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const router = useRouter();

  const results = useMemo(() => searchTokens(query), [query]);

  function goToToken(symbol: string) {
    setQuery("");
    router.push(`/tokens/${symbol}`);
  }

  function handleVoiceSearch() {
    setListening(true);
    // WIRE-UP: replace with the Web Speech API (SpeechRecognition) to
    // capture real voice input, then feed the transcript into setQuery().
    window.setTimeout(() => setListening(false), 1800);
  }

  return (
    <div className="relative w-full">
      <div
        className={cx(
          "glass-strong flex items-center gap-3 rounded-pill px-5",
          large ? "py-4" : "py-3"
        )}
      >
        <Search size={large ? 20 : 16} className="text-ink-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask StockMind AI — try “NVIDIA” or “AI”"
          className={cx(
            "flex-1 bg-transparent outline-none placeholder:text-ink-faint",
            large ? "text-base" : "text-sm"
          )}
        />
        <button
          onClick={handleVoiceSearch}
          aria-label="Voice search"
          className={cx(
            "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            listening ? "bg-mind text-void" : "text-ink-muted hover:text-mind"
          )}
        >
          {listening && (
            <span className="absolute inset-0 animate-ping rounded-full bg-mind/50" />
          )}
          <Mic size={16} />
        </button>
      </div>

      {query && (
        <div className="glass-strong absolute z-20 mt-2 w-full overflow-hidden rounded-2xl">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-sm text-ink-muted">No tokens match “{query}”.</p>
          ) : (
            results.map((t) => (
              <button
                key={t.symbol}
                onClick={() => goToToken(t.symbol)}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-mind/10"
              >
                <TokenLogo src={t.logo} symbol={t.symbol} size={32} />
                <span className="flex-1">
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block font-mono text-xs text-ink-muted">{t.symbol}</span>
                </span>
                <span className="font-mono text-sm text-ink-muted">
                  ${t.price.toFixed(2)}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
