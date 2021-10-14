import React from 'react';
import './App.css';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import MainPage from './pages/MainPage';
import { InfoPage } from './pages/InfoPage';

function App() {
  return (
    <div className="page-container">
      <div className='content'>
        <Router>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/infopage/' component={InfoPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
