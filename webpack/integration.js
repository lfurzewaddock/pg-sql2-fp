"use strict";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src")],
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          emitError: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(["lib"], {
      root: path.resolve(__dirname, "../"),
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../lib"),
  },
};

