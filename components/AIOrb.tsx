"use client";

import { motion } from "framer-motion";
import TokenLogo from "./TokenLogo";

const SATELLITES = [
  { logo: "https://logo.clearbit.com/apple.com", symbol: "AAPL", radius: 190, duration: 22, size: 44, delay: 0 },
  { logo: "https://logo.clearbit.com/nvidia.com", symbol: "NVDA", radius: 240, duration: 30, size: 40, delay: -4 },
  { logo: "https://logo.clearbit.com/tesla.com", symbol: "TSLA", radius: 150, duration: 18, size: 36, delay: -8 },
  { logo: "https://logo.clearbit.com/microsoft.com", symbol: "MSFT", radius: 280, duration: 36, size: 42, delay: -12 },
  { logo: "https://logo.clearbit.com/amazon.com", symbol: "AMZN", radius: 210, duration: 26, size: 38, delay: -16 },
  { logo: "https://logo.clearbit.com/meta.com", symbol: "META", radius: 260, duration: 32, size: 36, delay: -6 }
];

export default function AIOrb() {
  return (
    <div className="relative flex h-[480px] w-full items-center justify-center lg:h-[560px]">
      {/* outer rings */}
      {[420, 340, 260].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-mind/10"
          style={{ width: size, height: size }}
        />
      ))}

      {/* core orb */}
      <motion.div
        className="relative flex h-40 w-40 items-center justify-center rounded-full bg-mind/90 shadow-[0_0_120px_40px_rgba(212,255,0,0.25)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 animate-pulseGlow rounded-full bg-mind blur-2xl" />
        <div className="relative h-24 w-24 rounded-full bg-void/90" />
        <div className="absolute h-3 w-3 rounded-full bg-void" style={{ top: "38%", left: "42%" }} />
      </motion.div>

      {/* orbiting stock logos */}
      {SATELLITES.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            animation: `orbit ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
            // @ts-ignore custom property consumed by the orbit keyframes
            "--r": `${s.radius}px`
          }}
        >
          <div
            className="glass-strong flex items-center justify-center rounded-2xl p-1.5 shadow-lg"
            style={{ width: s.size, height: s.size }}
          >
            <TokenLogo src={s.logo} symbol={s.symbol} size={s.size - 12} rounded="rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
