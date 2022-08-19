var StringReplacePlugin = require("string-replace-webpack-plugin");
const path = require("path");
import pkg from '../package.json'
import { ifDebug } from "./lib/utils";

// buildMode determine routes to the bundle result
// there are 3 options
// - main: build only main application routes
// - admin: build only admin application routes
// - all: build both of them (will take more time)
const buildMode = process.env.RENTALL_BUILD_MODE || "all";
console.log("build with mode:", buildMode);

/**
 * this is css legacy support replacement which
 * will add esModule=false into each inline css loader
 * which hard coded in source code to avoid any source
 * modification
 */
const cssLoaderLegacySupportPlugins = {
  plugins: [new StringReplacePlugin()],
  loader: [
    {
      loader: StringReplacePlugin.replace({
        replacements: [
          {
            pattern: /css-loader\!/g,
            replacement: function (match, p1, offset, string) {
              return "css-loader?esModule=false!";
            },
          },
        ],
      }),
    },
  ],
};

const config = {
  mode: ifDebug("development", "production"),
  context: path.resolve(__dirname, ".."),
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: ifDebug(),
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: pkg.browserslist,
                  },
                  modules: false,
                  useBuiltIns: false,
                  debug: false,
                },
              ],
              "@babel/preset-react",

              //    ...isDebug ? [] : ['react-optimize'],
            ],
          },
        },
      },
      {
        test: /\.css/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: true,
              esModule: false,
              modules: {
                localIdentName: ifDebug(
                  "[name]-[local]-[hash:base64:5]",
                  "[hash:base64:5]"
                ),
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "../tools/postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: ifDebug("[path][name].[ext]?[hash:8]", "[hash:8].[ext]"),
        },
      },
    ],
  },
};
module.exports = { config, cssLoaderLegacySupportPlugins, buildMode };
