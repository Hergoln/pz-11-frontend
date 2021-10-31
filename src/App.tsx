import React from 'react';
import axios from 'axios';
import './App.css';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { InfoPage } from './pages/InfoPage';
import { IMessageEvent, ICloseEvent } from 'websocket';
import { WebsocketHandler } from './components/WebsocketHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//@ts-ignore
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


function messageHandler(event: IMessageEvent) {
  console.log("got a message: " + event.data);
}

function closeHandler(event: ICloseEvent) {
  console.log("closing the connection: " + event.code);
}

function errorHandler(error: Error) {
  console.log(error);
}

function App() {
  return (
    <>
      <ToastContainer autoClose={2500} position="top-right" />
      <div className="page-container">
        {/* <WebsocketHandler gameId={''} onMessageReceived={messageHandler} onConnectionClosed={closeHandler} onError={errorHandler} /> */}
        <div className='content'>
          <Router>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/infopage/' component={InfoPage} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
