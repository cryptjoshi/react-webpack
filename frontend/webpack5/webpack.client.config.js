import { request } from 'http';
import { RentAllAssetCopyPlugin } from './../tools/asset-copy'
const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const smp = new SpeedMeasurePlugin();
const outputDir = path.resolve(__dirname, '../build/public')
const { ifDebug, config, cssLoaderLegacySupportPlugins, buildMode } = require('../tools/webpack.base')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const TerserPlugin = require("terser-webpack-plugin");
import pkg from '../package.json'


module.exports = smp.wrap({
    mode: config.mode,
    context: config.context,
    name: 'client',
    devtool: "eval-cheap-source-map",
    entry: {
        client: [
            'babel-polyfill',
            './src/client.js',
        ],
    },
    output: {
        publicPath: config.output.publicPath,
        path: outputDir,
        filename: ifDebug('[name].js', '[chunkhash:8].js'),
        chunkFilename: ifDebug('[name].chunk.js', '[chunkhash:8].chunk.js'),
    },
    externals: [],
    resolve: {
        fallback: {
            "crypto": false,
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "assert": require.resolve("assert"),
        }
    },
    optimization: {
        minimize: ifDebug(false, true),
        minimizer: [ 
            new TerserPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                },
            },
        },
    },

    plugins: [
        new RentAllAssetCopyPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': ifDebug('"development"', '"production"'),
            'process.env.BROWSER': true,
            'process.env.RENTALL_BUILD_MODE': `"${buildMode}"`,
            __DEV__: ifDebug(true, false),
        }),

        new AssetsPlugin({
            path: path.resolve(__dirname, '../build'),
            filename: 'assets.json',
            prettyPrint: true,
            removeFullPathAutoPrefix: true,
        }),
        ...cssLoaderLegacySupportPlugins.plugins,
    ],
    module: {
      rules:[
            {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            //plugins: isDebug ? [require.resolve('react-refresh/babel')]:[],
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
      ...config.module.rules
      ]
    }
})