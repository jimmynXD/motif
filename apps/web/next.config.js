const path = require("node:path")

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["ui"],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}
