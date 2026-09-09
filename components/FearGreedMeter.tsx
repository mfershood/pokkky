"use client";

import { motion } from "framer-motion";

export default function FearGreedMeter({ value }: { value: number }) {
  const angle = -90 + (value / 100) * 180;

  const label =
    value < 25 ? "Extreme Fear" : value < 45 ? "Fear" : value < 55 ? "Neutral" : value < 75 ? "Greed" : "Extreme Greed";

  const color = value < 45 ? "#FF5C5C" : value < 55 ? "#F5F5F0" : "#D4FF00";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[240px]">
        <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          fill="none"
          stroke="url(#fgGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset={283 - (value / 100) * 283}
        />
        <defs>
          <linearGradient id="fgGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF5C5C" />
            <stop offset="50%" stopColor="#F5F5F0" />
            <stop offset="100%" stopColor="#D4FF00" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <line x1="100" y1="100" x2="100" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <circle cx="100" cy="100" r="5" fill={color} />
      </svg>
      <p className="mt-2 font-mono text-2xl font-medium" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  );
}
