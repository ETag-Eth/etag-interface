import React, { StrictMode } from 'react';

import { Web3ReactProvider } from '@web3-react/core';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';

import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import getLibrary from './utils/getLibrary';

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
