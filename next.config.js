const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  webpack: (config) => {
    // RainbowKit -> wagmi -> Coinbase's optional "smart wallet" connector pulls in
    // @coinbase/cdp-sdk, which tries to lazy-import the optional @x402/* payment
    // packages. We don't use that feature, and those packages aren't installed,
    // so tell webpack to skip resolving them instead of failing the build.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@x402\//
      })
    );
    return config;
  }
};

module.exports = nextConfig;