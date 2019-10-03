import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

 export default function App(){

     return(
        <Router>
            <div>
                <Route exact path='/' component={HomePage} />
            </div>
        </Router>
     );
 }
