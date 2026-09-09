const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  webpack: (config) => {
    // RainbowKit -> wagmi pulls in several optional connector packages that
    // are never actually installed because we don't use those features:
    //   - @x402/*                       (Coinbase's optional payment scheme)
    //   - @react-native-async-storage/* (only needed inside React Native)
    //   - pino-pretty                    (optional pretty-printer for the
    //                                     WalletConnect logger, dev-only)
    // Tell webpack to skip resolving them instead of erroring/warning.
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^@x402\// }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^@react-native-async-storage\/async-storage$/
      }),
      new webpack.IgnorePlugin({ resourceRegExp: /^pino-pretty$/ })
    );
    return config;
  }
};

module.exports = nextConfig;
