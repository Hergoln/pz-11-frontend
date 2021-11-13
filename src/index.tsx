import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //@ts-ignore
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_API_WEBSOCKET_SERVER_URL: string;
      REACT_APP_API_SERVER_URL: string;
    }
  }
}

//@ts-ignore
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
