const webpack = require('webpack')
const path = require('path')
import { config }  from '../tools/webpack.base'
const {buildMode,cssLoaderLegacySupportPlugins} = require('../tools/webpack.base')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
import { ifDebug } from '../tools/lib/utils';
const smp = new SpeedMeasurePlugin();
import pkg from '../package.json'


module.exports  =smp.wrap({
    mode: config.mode,
    context: config.context,
    name: 'server',
    target: 'node',
    entry: {
        client: [
            'babel-polyfill',
            'react-hot-loader/patch',
            //'webpack-hot-middleware/client',
            './src/express.js',
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
       // cssLoaderLegacySupportPlugins.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin({ }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
            'process.env.NODE_ENV': ifDebug('"development"' ,'"production"'),
            'process.env.RENTALL_BUILD_MODE': `"${buildMode}"`,
            __DEV__: ifDebug(),
            __CLIENT__: !ifDebug(),
            __SERVER__: ifDebug(),
        }),
         new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    ],
    module: {
        rules: [
            ...config.module.rules,
        ]
    }
})
