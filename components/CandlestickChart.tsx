"use client";

import { useMemo, useState } from "react";

type Candle = { open: number; close: number; high: number; low: number };

/**
 * WIRE-UP: replace this generator with real OHLC candles pulled from your
 * Robinhood Chain indexer / Chainlink historical rounds. The shape below
 * (`Candle[]`) is exactly what the chart expects — swap the data source,
 * keep the rendering.
 */
function generateCandles(basePrice: number, count = 40): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice * 0.94;

  for (let i = 0; i < count; i++) {
    const open = price;
    const drift = (Math.random() - 0.48) * basePrice * 0.014;
    const close = Math.max(open + drift, basePrice * 0.5);
    const high = Math.max(open, close) + Math.random() * basePrice * 0.005;
    const low = Math.min(open, close) - Math.random() * basePrice * 0.005;
    candles.push({ open, close, high, low });
    price = close;
  }
  return candles;
}

const WIDTH = 760;
const HEIGHT = 300;
const PADDING = 24;

export default function CandlestickChart({ basePrice }: { basePrice: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = useMemo(() => generateCandles(basePrice), [basePrice]);

  const { min, max } = useMemo(() => {
    const lows = data.map((d) => d.low);
    const highs = data.map((d) => d.high);
    return { min: Math.min(...lows) * 0.997, max: Math.max(...highs) * 1.003 };
  }, [data]);

  const slot = (WIDTH - PADDING * 2) / data.length;
  const candleWidth = Math.max(slot * 0.55, 2);

  function yFor(value: number) {
    const ratio = (value - min) / (max - min);
    return HEIGHT - PADDING - ratio * (HEIGHT - PADDING * 2);
  }

  const active = hovered !== null ? data[hovered] : data[data.length - 1];

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-4 font-mono text-xs text-ink-muted">
        <span>O <span className="text-ink">{active.open.toFixed(2)}</span></span>
        <span>H <span className="text-ink">{active.high.toFixed(2)}</span></span>
        <span>L <span className="text-ink">{active.low.toFixed(2)}</span></span>
        <span>C <span className="text-ink">{active.close.toFixed(2)}</span></span>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-64 w-full sm:h-80"
        onMouseLeave={() => setHovered(null)}
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={0}
            x2={WIDTH}
            y1={PADDING + f * (HEIGHT - PADDING * 2)}
            y2={PADDING + f * (HEIGHT - PADDING * 2)}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {data.map((c, i) => {
          const x = PADDING + i * slot + slot / 2;
          const up = c.close >= c.open;
          const color = up ? "#D4FF00" : "#FF5C5C";
          const bodyTop = yFor(Math.max(c.open, c.close));
          const bodyBottom = yFor(Math.min(c.open, c.close));
          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              style={{ cursor: "pointer" }}
              opacity={hovered === null || hovered === i ? 1 : 0.55}
            >
              <line x1={x} x2={x} y1={yFor(c.high)} y2={yFor(c.low)} stroke={color} strokeWidth={1} />
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyBottom - bodyTop, 1.5)}
                fill={color}
                rx={1}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
