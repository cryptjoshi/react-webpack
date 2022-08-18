const express = require('express');
const path = require('path');
const cons = require('consolidate');
const fs = require('fs');
const browserSync = require("browser-sync");
const port = 5469;
const app = express();

app.disable('x-powered-by');
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

const wpConfig = require("../tools/webpack.base");

if(process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(wpConfig);

    app.use(webpackDevMiddleware(compiler, {
        stats: {colors: true},
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(require('./routes'));

app.use(express.static(wpConfig.output.path));

app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});