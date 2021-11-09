import React from 'react';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { InfoPage } from './pages/InfoPage';
import { ToastContainer } from 'react-toastify';
import { IMessageEvent, ICloseEvent } from 'websocket';
import { WebsocketHandler } from './components/WebsocketHandler';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AgarntPage from './pages/game-pages/AgarntPage';

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
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="page-container" style={{ height: '100%' }}>
        {/* <WebsocketHandler gameId={''} onMessageReceived={messageHandler} onConnectionClosed={closeHandler} onError={errorHandler} /> */}
        <div className='content'>
          <Router>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/infopage/' component={InfoPage} />
              <Route exact path='/agarnt/' component={AgarntPage} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
