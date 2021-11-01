import React from 'react';
import './App.css';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import MainPage from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';

function App() {
  return (
    <div className="page-container">
      <div className='content'>
        <Router>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/about/' component={AboutPage} />
            <Route exact path='/contact/' component={ContactPage} />
            <Route exact path='/faq/' component={FAQPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
