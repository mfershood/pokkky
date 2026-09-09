"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Brain } from "lucide-react";
import WalletConnectButton from "./WalletConnectButton";
import { cx } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stake", label: "Stake" },
  { href: "/analytics", label: "Analytics" },
  { href: "/terminal", label: "AI Terminal" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-void/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mind text-void">
            <Brain size={18} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            StockMind <span className="text-mind">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(
                "rounded-pill px-4 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-mind/10 text-mind"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <WalletConnectButton />
        </div>

        <button
          className="rounded-lg border border-border p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-void px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "rounded-lg px-3 py-2.5 text-sm",
                  pathname === link.href ? "bg-mind/10 text-mind" : "text-ink-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
