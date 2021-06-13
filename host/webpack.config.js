var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

const nodeExternals = require('webpack-node-externals');
const packageJsonDeps = require("./package.json").dependencies;

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
      name: 'host',
      filename: 'remoteEntryHost.js',
      remotes: {
        product: 'product@http://localhost:5002/build/client/remoteEntryProduct.js',
        cart: 'cart@http://localhost:5001/build/client/remoteEntryCart.js'
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
      name: 'host',
      filename: 'remoteEntryHost.js',
      library: { type: "commonjs-module" },
      remotes: {
        product: path.resolve(
          __dirname,
          "../product/build/server/remoteEntryProduct.js"
        ),
        cart: path.resolve(
          __dirname,
          "../cart/build/server/remoteEntryCart.js"
        ),
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
    })
  ]
};

module.exports = [clientConfig, serverConfig];