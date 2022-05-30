const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"]
        },
        use: "ts-loader"
      },
      {
        test: /\.css$|\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      }
    ]
  },
  devServer: {
    port: process.env.PORT || 3000,
    historyApiFallback: true
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    new webpack.EnvironmentPlugin([
      "PORT",
      "FIREBASE_API_KEY",
      "FIREBASE_APP_ID",
      "FIREBASE_AUTH_DOMAIN",
      "FIREBASE_MESSAGING_SENDER_ID",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_STORAGE_BUCKET"
    ])
  ]
};
