export default function DocsPage() {
  const sections = [
    {
      title: "Getting started",
      body: "Connect a wallet (MetaMask, Rabby, WalletConnect, or Robinhood Wallet), switch to Robinhood Chain, and browse AI Markets for available tokenized stocks."
    },
    {
      title: "Swapping",
      body: "Use the AI Terminal or any token page to open the swap widget. Set slippage tolerance, review price impact and gas, then confirm."
    },
    {
      title: "Staking",
      body: "Stake supported stock tokens on the Robinhood Rewards page to earn $MIND. Longer lock periods carry higher APY; rewards accrue and settle on-chain."
    },
    {
      title: "Oracles",
      body: "Every token price is sourced from a Chainlink-compatible aggregator deployed on Robinhood Chain. Oracle status and last-update time are shown on every market and token page."
    }
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Docs</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Everything you need to trade tokenized US equities on StockMind AI.
      </p>
      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="glass rounded-card p-6">
            <h2 className="text-base font-medium">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
