const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const WebpackPwaManifest = require("@gzaripov/webpack-pwa-manifest");

const template = require("./config/template.js");

module.exports = function (options) {
  const isEnvProduction = options.mode === "production";
  const isEnvDevelopment = !isEnvProduction;
  const isDevServer = isEnvDevelopment && process.argv.includes("serve");
  const webpackConfig = {
    mode: "production",
    entry: "./src/index.tsx",
    bail: true,
    target: "browserslist",
    devtool: false,
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      // devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      assetModuleFilename: "images/[hash][ext][query]",
      publicPath: "",
    },

    performance: {
      maxAssetSize: 650 * 1024,
      maxEntrypointSize: 650 * 1024,
    },

    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },

    resolve: {
      // include
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
      // short path
      alias: {
        Shared: path.resolve(__dirname, "src/shared/"),
        Assets: path.resolve(__dirname, "src/assets/"),
      },
    },

    module: {
      rules: [
        // jsx
        // {
        //     test: /\.jsx?$/,
        //     exclude: /node_modules/
        //     use: {
        //       loader: "babel-loader",
        //       options: {
        //         plugins: [isDevServer && 'react-refresh/babel'].filter(Boolean),
        //         cacheDirectory: true
        //       }
        //     }
        // },
        // typescript
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        //scss,sass
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            isEnvDevelopment
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: "" },
                },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                // modules: {
                //   localIdentName: isEnvDevelopment ? '[path][name]__[local]' : '[hash:base64]',
                // },
              },
            },
            "sass-loader",
          ].filter(Boolean),
        },
        //icon
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/design/[name].[hash:6][ext]",
          },
        },
        //font
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
      ],
    },

    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
      }),
      new ESLintPlugin(),
      new MiniCssExtractPlugin(),
      // include ENV variables
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     API_KEY_DADATA: JSON.stringify(process.env.API_KEY_DADATA),
      //     API_AXSIOS: JSON.stringify(process.env.API_AXSIOS),
      //   },
      // }),
      new HtmlWebpackPlugin({
        inject: true,
        title: template.title,
        // favIcon: template.public + '/favicon.ico',
        template: template.appHtml, // template file
        filename: "index.html", // output file
        // meta: template.HtmlWebpackPluginMeta,
        ...(isEnvProduction && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
      }),
      new WebpackPwaManifest(template.WebpackPwaManifest),
      isDevServer && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };

  const devServer = {
    static: {
      directory: template.public,
      serveIndex: true,
      watch: true,
    },
    hot: true,
    compress: true,
    open: true,
    port: 3000,
  };

  return isDevServer ? { ...webpackConfig, devServer } : webpackConfig;
};
