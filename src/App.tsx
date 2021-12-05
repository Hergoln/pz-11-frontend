import React from 'react';
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AgarntPage from './pages/game-pages/AgarntPage';

function App() {
    return (
        <>
            <ToastContainer autoClose={3500} position="top-right" />
            <div className="page-container" style={{ height: '100%' }}>
                <div className="content">
                    <Router>
                        <Switch>
                            <Route exact path="/agarnt/" component={AgarntPage} />
                            <Route exact path="/" component={MainPage} />
                            <Route exact path="/about/" component={AboutPage} />
                            <Route exact path="/contact/" component={ContactPage} />
                            <Route exact path="/faq/" component={FAQPage} />
                        </Switch>
                    </Router>
                </div>
            </div>
        </>
    );
}

export default App;
