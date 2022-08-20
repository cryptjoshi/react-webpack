 
import * as path from 'path'
import * as util from 'util'
import { cleanDir } from './lib/fs';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import cp from 'child_process';
import { port } from '../src/config'
import { ifDebug } from './lib/utils';
const exec = util.promisify(require('child_process').exec);
const clientConfig = require('../webpack5/webpack.client.config');
const serverConfig = require('../webpack5/webpack.server.config');

(async function start() {
    //await exec(`rm -rf ${path.resolve(__dirname, '../build')}`)
    await cleanDir(`${path.resolve(__dirname, '../build')}`)
    if (ifDebug()) {
        // setting up hot reload entry and plugin to enable it
        // which already support react-hot-reload
        clientConfig.entry.client = [
            'webpack-hot-middleware/client',
           // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            ...clientConfig.entry.client
        ]
        clientConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        )
    }
    
    const webpackBundler = webpack([clientConfig, serverConfig])

   
    const devMiddle = webpackDevMiddleware(webpackBundler, {
        publicPath: clientConfig.output.publicPath,
        writeToDisk: true,
    })
   
     devMiddle.waitUntilValid(() => {
        const bs = browserSync.create();
        bs.init({
            proxy: {
                target: `http://localhost:${port}`,
                middleware: [devMiddle, webpackHotMiddleware(webpackBundler.compilers[0], {})],
            },
        }, () => {


             console.log(`BrowserSync up and running at http://localhost:${port}`)
             console.log('starting backend service....')
 
             const server = cp.spawn('node', [path.join(serverConfig.output.path, serverConfig.output.filename)], {
                 silent: false,
                 env: {
                     ...process.env,
                     NODE_ENV: 'development'
                 }
             })

            handleServer(server)
            server.stderr = process.stderr
            process.on('exit', () => {
                server.kill('SIGTERM')
            })
         })



     })
})()

function handleServer(server) {
    server.once('exit', (code) => {
        throw new Error(`server terminated unexpectedly with code ${code}`)
    })
    server.stdout.on('data', (data) => {
        process.stdout.write(data);
    })
    server.stderr.on('data', (data) => {
        process.stdout.write(data);
    })
}