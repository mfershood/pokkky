"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/utils";

function domainFromLogoUrl(src: string): string | null {
  const match = src.match(/clearbit\.com\/(.+)$/);
  return match ? match[1] : null;
}

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
  const [stage, setStage] = useState<"primary" | "fallback" | "failed">("primary");

  const fallbackSrc = useMemo(() => {
    const domain = domainFromLogoUrl(src);
    return domain
      ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}`
      : null;
  }, [src]);

  const currentSrc = stage === "primary" ? src : fallbackSrc;

  function handleError() {
    // Clearbit's domain is on many ad-block / privacy-extension blocklists
    // (Brave Shields, uBlock Origin, etc). If the primary logo fails, fall
    // back to Google's favicon service, which is almost never blocked. If
    // that also fails, show the ticker's initials instead of a broken image.
    if (stage === "primary" && fallbackSrc) setStage("fallback");
    else setStage("failed");
  }

  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center overflow-hidden bg-white",
        rounded
      )}
      style={{ width: size, height: size }}
    >
      {stage !== "failed" && currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${symbol} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={handleError}
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
