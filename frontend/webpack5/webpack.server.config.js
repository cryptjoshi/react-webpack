const webpack = require('webpack')
const path = require('path')
const { config, cssLoaderLegacySupportPlugins, buildMode } = require('../tools/webpack.base')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const isDebug = true;
const smp = new SpeedMeasurePlugin();
import pkg from '../package.json'

module.exports = smp.wrap({
    mode: config.mode,
    context: config.context,
    name: 'server',
    target: 'node',
    entry: {
        client: [
            'babel-polyfill',
            './src/server.js',
        ]
    },
    output: {
        ...config.output,
        path: path.resolve(__dirname, '../build'),
        filename: 'server-ssr.js',
        libraryTarget: 'commonjs',
    },
    externals: [
        'sharp', 'bcrypt', 'sequelize',
        /^\.\/assets\.json$/,
        ({ context, request }, callback) => {
            const isExternal =
                request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
                !request.match(/\.(css|less|scss|sss)$/i);
            callback(null, Boolean(isExternal));
        },
    ],
    plugins: [
        ...cssLoaderLegacySupportPlugins.plugins,
        new webpack.ProgressPlugin({ }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            'process.env.RENTALL_BUILD_MODE': `"${buildMode}"`,
            __DEV__: isDebug,
        }),
    ],
    module: {
        rules: [
            //...config.module.rules,
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, "../src")],
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    //plugins: isDebug ? [require.resolve('react-refresh/babel')]:[],
                    cacheDirectory: isDebug,
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