var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

const nodeExternals = require('webpack-node-externals');

var clientConfig = {
  mode: "development",
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: "[name].js",
    clean: true
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new ModuleFederationPlugin({
      name: 'price',
      filename: 'remoteEntryClient.js',
      exposes: {
          './Price': './src/components/Price',
      },
      // shared: {
      //   ...packageJsonDeps,
      //   react: {
      //     singleton: true,
      //     eager: true,
      //     requiredVersion: packageJsonDeps.react,
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     eager: true,
      //     requiredVersion: packageJsonDeps["react-dom"],
      //   },
      // }
    }),
  ]
};

var serverConfig = {
  mode: "development",
  entry: ["babel-polyfill", path.resolve(__dirname, "server/server.js")],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('build/server'),
    filename: 'server.js',
    publicPath: "auto",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'price',
      filename: 'remoteEntry.js',
      library: { type: "commonjs-module" },
      exposes: {
          './Price': './src/components/Price',
      }
    })
  ]
};

module.exports = [clientConfig, serverConfig];