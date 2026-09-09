"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf = 0;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  live = true
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  live?: boolean;
}) {
  const animated = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-card p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-muted">{label}</span>
        {live && (
          <span className="flex items-center gap-1.5 text-[10px] text-mind">
            <span className="h-1.5 w-1.5 rounded-full bg-mind shadow-[0_0_6px_#D4FF00]" />
            LIVE
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-2xl font-medium text-ink sm:text-3xl">
        {prefix}
        {animated.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}
        {suffix}
      </p>
    </motion.div>
  );
}
