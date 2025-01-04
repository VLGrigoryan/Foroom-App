const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.TARGET = process.env.TARGET || 'web'; // Set default value for TARGET
const isCordova = process.env.TARGET === 'cordova';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(
  __dirname,
  isCordova ? './cordova/www' : './www'
);

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: BUILD_DIR,
    publicPath: isCordova ? './' : '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000, // Reducing maxSize to optimize chunk sizes
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2, // Move common code into a separate chunk
          priority: -10,
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          enforce: true, // Extract CSS into its own chunk
        },
      },
    },
    minimize: true, // Ensure minimization of code
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.f7$/,
        type: 'asset/source',
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        TARGET: process.env.TARGET || 'web',
      },
    }),
    new webpack.DefinePlugin({
      'process.env.TARGET': JSON.stringify(process.env.TARGET || 'web'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /cordova.js$/,
      contextRegExp: /src/,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    static: PUBLIC_DIR,
    hot: true,
    port: 3000,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
    extensions: ['.js', '.f7', '.css', '.scss'],
  },
};
