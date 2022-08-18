// import { match, Router, browserHistory as history } from 'react-router';
// import routes from './routes';
// import ReactDOM from 'react-dom';
// import React from 'react';
 
// import { AppContainer } from 'react-hot-loader';


// ReactDOM.render(
//   <AppContainer>
//     <Provider>
//       <Router history={history} routes={routes} />
//     </Provider>
//   </AppContainer>,
//   document.getElementById('app'));

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     const nextRoutes = require('./routes').default;
//     ReactDOM.render(
//       <AppContainer>
//         <Provider >
//           <Router key={Math.random()} history={history} routes={nextRoutes} />
//         </Provider>
//       </AppContainer>,
//       document.getElementById('app'));
//   });
// }

// client/entry.jsx
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

function render(Root) {
    ReactDOM.render(<AppContainer><Root/></AppContainer>, document.getElementById('app'));
}

render(App);

if(module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}