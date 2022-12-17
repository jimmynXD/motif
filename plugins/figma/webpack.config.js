const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default
const RemovePlugin = require("remove-files-webpack-plugin")
const PostCompilePlugin = require("webpack-post-compile-plugin")

const path = require("path")
const webpack = require("webpack")

module.exports = (env, argv) => {
  const plugins = [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/modules/meta/ui/index.html",
      filename: "ui.html",
      chunks: ["ui"],
    }),
    new PostCompilePlugin({
      compilePaths: [
        "node_modules/@trpc",
        "node_modules/zod",
        "node_modules/ui",
      ],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ]

  if (argv.mode === "development") {
    plugins.push(
      new WatchExternalFilesPlugin({
        files: [
          "./src/**/*.ts",
          "./src/**/*.tsx",
          "./src/**/*.css",
          "./node_modules/ui/**/src/*.ts",
          "./node_modules/ui/**/src/*.tsx",
        ],
      })
    )
  } else {
    plugins.push(
      new RemovePlugin({
        after: { include: ["dist/ui.js"] },
      })
    )
  }

  return {
    mode: argv.mode === "production" ? "production" : "development",

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === "production" ? false : "inline-source-map",

    entry: {
      ui: "./src/ui.ts", // The entry point for your UI code
      code: "./src/main.ts", // The entry point for your plugin code
    },

    devServer: {
      static: "./dist",
      hot: true,
    },

    module: {
      rules: [
        // Converts TypeScript code to JavaScript
        {
          test: /\.(tsx?|jsx?)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
            },
          ],
        },
        // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
        // { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] }
        {
          test: /\.svg/,
          type: "asset/inline",
        },
      ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins,
  }
}
