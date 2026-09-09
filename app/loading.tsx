export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass h-44 animate-pulse rounded-card" />
        ))}
      </div>
    </div>
  );
}
