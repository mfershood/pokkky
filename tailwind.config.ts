import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#070707",
        surface: "#0D0D0D",
        glass: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
        mind: {
          DEFAULT: "#D4FF00",
          dim: "#A6C700",
          soft: "rgba(212,255,0,0.12)"
        },
        ink: {
          DEFAULT: "#F5F5F0",
          muted: "#8B8D85",
          faint: "#55564F"
        },
        loss: "#FF5C5C",
        gain: "#D4FF00"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      borderRadius: {
        card: "28px",
        pill: "999px"
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(212,255,0,0.08), transparent 60%)",
        "grid-lines": "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(var(--r)) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(var(--r)) rotate(-360deg)" }
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      },
      animation: {
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        orbit: "orbit linear infinite",
        drift: "drift 6s ease-in-out infinite",
        ticker: "ticker 40s linear infinite"
      }
    }
  },
  plugins: []
};
export default config;
