import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-sm text-mind">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Token not found</h1>
      <p className="mt-2 text-sm text-ink-muted">
        This asset isn't listed on StockMind AI yet. Try searching AI Markets instead.
      </p>
      <Link href="/markets" className="mt-6 rounded-pill bg-mind px-6 py-3 text-sm font-semibold text-void">
        Back to Markets
      </Link>
    </div>
  );
}
