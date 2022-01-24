const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join } = require("path");

const EXTENSION_ROOT = __dirname;

const config = {
  mode: "production",
  resolve: {
    alias: {
      "~": EXTENSION_ROOT,
      "popup": join(EXTENSION_ROOT, "packages/popup"),
      "content": join(EXTENSION_ROOT, "packages/content"),
      "background": join(EXTENSION_ROOT, 'packages/background'),
    },
  },
};

const popup = Object.assign({}, config, {
  name: "popup",
  entry: join(EXTENSION_ROOT, "packages/popup/popup.js"),
  output: {
    path: join(EXTENSION_ROOT, "packages/popup/dist"),
    filename: "popup.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: join(EXTENSION_ROOT, "packages/popup/popup.html"),
      filename: join(EXTENSION_ROOT, "packages/popup/dist/popup.html"),
    }),
    new CssMinimizerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(EXTENSION_ROOT, "packages/popup/assets"),
          to: join(EXTENSION_ROOT, "packages/popup/dist/assets"),
        },
        {
          from: join(EXTENSION_ROOT, "packages/popup/styles"),
          to: join(EXTENSION_ROOT, "packages/popup/dist/styles"),
        },
      ],
    }),
  ],
});

const content = Object.assign({}, config, {
  name: "content",
  entry: join(EXTENSION_ROOT, "packages/content/content.js"),
  output: {
    path: join(EXTENSION_ROOT, "packages/content/dist"),
    filename: "content.js",
  },
});

const background = Object.assign({}, config, {
  name: "background",
  entry: join(EXTENSION_ROOT, "packages/background/background.js"),
  output: {
    path: join(EXTENSION_ROOT, "packages/background/dist"),
    filename: "background.js",
  },
});

module.exports = [popup, content, background];
