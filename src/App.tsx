import React from 'react';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { InfoPage } from './pages/InfoPage';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AgarntPage from './pages/game-pages/AgarntPage';

function App() {
  return (
    <>
      <ToastContainer autoClose={3500} position="top-right" />
      <div className="page-container" style={{ height: '100%' }}>
        <div className='content'>
          <Router>
            <Switch>
              <Route exact path='/infopage/' component={InfoPage} />
              <Route exact path='/agarnt/' component={AgarntPage} />
              <Route exact path='/' component={MainPage} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
