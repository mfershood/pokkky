"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

export default function WalletConnectButton({ compact = false }: { compact?: boolean }) {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, openChainModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div aria-hidden={!ready}>
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="group flex items-center gap-2 rounded-pill bg-mind px-5 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Wallet size={16} strokeWidth={2.5} />
                {compact ? "Connect" : "Connect Wallet"}
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                className="rounded-pill border border-loss/60 bg-loss/10 px-5 py-2.5 text-sm font-semibold text-loss"
              >
                Wrong network
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                className="flex items-center gap-2 rounded-pill border border-border glass px-4 py-2 text-sm font-medium text-ink hover:border-mind/40"
              >
                <span className="h-2 w-2 rounded-full bg-mind shadow-[0_0_8px_#D4FF00]" />
                {account.displayName}
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
