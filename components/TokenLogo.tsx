"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";

export default function TokenLogo({
  src,
  symbol,
  size = 40,
  rounded = "rounded-xl"
}: {
  src: string;
  symbol: string;
  size?: number;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center overflow-hidden bg-white",
        rounded
      )}
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <img
          src={src}
          alt={`${symbol} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-[15%]"
        />
      ) : (
        <span
          className="font-mono font-semibold text-void"
          style={{ fontSize: size * 0.38 }}
        >
          {symbol.slice(0, 2)}
        </span>
      )}
    </span>
  );
}
