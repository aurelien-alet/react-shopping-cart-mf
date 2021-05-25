const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const packageJsonDeps = require("./package.json").dependencies;
const DashboardPlugin = require("@module-federation/dashboard-plugin")

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 5001,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf|json)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              limit: 8192,
              context: path.resolve(__dirname, "../src"),
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
          './Cart': './src/components/Cart',
      },
      shared: {
        ...packageJsonDeps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packageJsonDeps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: packageJsonDeps["react-dom"],
        },
      }
    }),
    new DashboardPlugin({
      dashboardUrl: "http://localhost:3000/api/update"
    })
  ]
};
