import Link from "next/link";
import { Brain, Twitter, Github, MessageCircle, Send } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Markets", href: "/markets" },
      { label: "Swap Terminal", href: "/terminal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Robinhood Rewards", href: "/stake" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "AI Analytics", href: "/analytics" },
      { label: "Docs", href: "/docs" },
      { label: "Oracle Status", href: "/analytics" },
      { label: "Support", href: "/docs" }
    ]
  }
];

const BADGES = [
  "Robinhood Chain compatible",
  "Powered by Chainlink Oracle",
  "ERC-20 Stock Tokens",
  "24/7 On-chain Markets"
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-void">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mind text-void">
                <Brain size={18} strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold">
                StockMind <span className="text-mind">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              The AI terminal for tokenized markets. Trade, stake, and analyze
              on-chain US equities on Robinhood Chain.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:border-mind/40 hover:text-mind"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink-muted hover:text-mind">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border/70 pt-8">
          {BADGES.map((b) => (
            <span
              key={b}
              className="rounded-pill border border-border px-3 py-1.5 font-mono text-xs text-ink-muted"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StockMind AI. Not affiliated with Robinhood Markets, Inc.</p>
          <p>Tokenized equities carry market and smart-contract risk. DYOR.</p>
        </div>
      </div>
    </footer>
  );
}
