const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { WatchIgnorePlugin } = require('webpack');

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/index.ts",
    demo: "./demo/custom.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new HtmlWebpackPlugin({
      title: "Demo",
      template: "demo/custom.html", // Cambia la ruta del archivo HTML si es necesario
    }),
  ],
};
