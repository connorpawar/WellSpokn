import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';

 export default function App(){


const theme = createMuiTheme({
	palette: {
	  primary: deepOrange,
	},
  });

     return(
        <Router>
            <div>
				<ThemeProvider theme={theme}>
                	<Route exact path='/' component={HomePage} />
				</ThemeProvider>
            </div>
        </Router>
     );
 }
