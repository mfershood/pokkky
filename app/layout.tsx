import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "StockMind AI — The AI Terminal for Tokenized Markets",
  description:
    "Trade tokenized US stocks on Robinhood Chain with an AI-native terminal. Live oracle pricing, on-chain swaps, staking rewards, and AI market analytics.",
  keywords: [
    "StockMind AI",
    "Robinhood Chain",
    "tokenized stocks",
    "on-chain equities",
    "Chainlink oracle",
    "DeFi",
    "AI trading terminal"
  ],
  openGraph: {
    title: "StockMind AI — The AI Terminal for Tokenized Markets",
    description: "AI-native terminal for tokenized US equities on Robinhood Chain.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-void text-ink antialiased selection:bg-mind selection:text-void">
        <Providers>
          <div className="fixed inset-0 grid-overlay pointer-events-none opacity-60" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
