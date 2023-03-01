const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIRECTORY = __dirname;

const config = {
  mode: 'production',
  resolve: {
    alias: {
      '@shared': resolve(ROOT_DIRECTORY, './shared'),
      '@popup': resolve(ROOT_DIRECTORY, './packages/popup/src'),
      '@content': resolve(ROOT_DIRECTORY, './packages/content/src'),
      '@background': resolve(ROOT_DIRECTORY, './packages/background/src'),
    },
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};

const popup = merge(config, {
  name: 'popup',
  entry: resolve(ROOT_DIRECTORY, './packages/popup/src/popup.tsx'),
  output: {
    path: resolve(ROOT_DIRECTORY, './packages/popup/dist'),
    filename: 'popup.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'react': ['./node_modules/preact/compat/'],
      'react-dom': ['./node_modules/preact/compat/'],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-typescript', { jsxPragma: 'h' }],
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(ROOT_DIRECTORY, './packages/popup/popup.html'),
      filename: resolve(ROOT_DIRECTORY, './packages/popup/dist/popup.html'),
    }),
  ],
});

const content = merge(config, {
  name: 'content',
  entry: resolve(ROOT_DIRECTORY, './packages/content/src/content.ts'),
  output: {
    path: resolve(ROOT_DIRECTORY, './packages/content/dist'),
    filename: 'content.js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});

const background = merge(config, {
  name: 'background',
  entry: resolve(ROOT_DIRECTORY, './packages/background/src/background.ts'),
  output: {
    path: resolve(ROOT_DIRECTORY, './packages/background/dist'),
    filename: 'background.js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});

module.exports = [popup, content, background];
