import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/server';
import express from "express";
import compression from "compression";
import UniversalRouter from 'universal-router'
import UniversalRouterSync from 'universal-router/sync';
import PrettyError from 'pretty-error';
import errorPageStyle from './routes/error/ErrorPage.css';
import routes from "./routes"
const app = express()
app.use(compression());
import bodyParser from 'body-parser'
import App from './components/App'
import Html from './components/Html';
const port = 8080
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
 
//
// Authentication
// -----------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
if (__DEV__) {
    app.enable('trust proxy');
  }
//app.use(express.static(config.output.path));

 const context = {
    insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      store: {
        subscribe:{},
        dispatch:{},
        getState:{}
      },
      client: {}
 }

 
const locale = "en"
// const render = () =>{
//     res.status(200);
//     res.send(`<!doctype html>${ReactDOM.renderToStaticMarkup(<Html {...data}/>)}`);
  
// }
app.get('*', async (req, res, next) => {
    try 
    { 
        const locale = "en"
        const css = new Set();
        const router = new UniversalRouterSync(routes,{...context,  path: req.path,
          query: req.query,
          pathname: req.path,
          locale})
        const result = await router.resolve({path:req.path,pathname:req.path})
      
    //     if (result.redirect) {
    //       res.redirect(result.status || 302, result.redirect);
    //       return;
    //     }
    //     const data = {...result}
    //     data.children = await renderToStringWithData(<App context={context}>{result.component}</App>);
    //     data.styles = [
    //       { id: 'css', cssText: [...css].join('') },
    //     ];
    //     data.scripts = [
    //      // client.js
    //     ];
      
    //     if (result.chunks) {
    //       data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    //     }
    //    // data.scripts.push(assets.client.js);
    
    //     data.lang = locale;
    
    //     const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    //     res.status(200);
    //     res.send(`<!doctype html>${html}`);
      }
      catch(err) {
        next(err);
      }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const locale = req.language;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      lang={locale}
    >
      {/* {ReactDOM.renderToString(
        <IntlProvider locale={locale}>
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>,
      )} */}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});