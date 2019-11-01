import React,  { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import Settings from './Components/Pages/Settings';
import Login from './Components/Pages/Login';
import SpeechPage from './Components/Pages/SpeechPage'
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

export default function App() {

	const [isThemeLight, setThemeLight] = useState(true);

	const Mode = (mode) => {
		return setThemeLight(mode);
	}

	const themeLight = createMuiTheme({
		palette: {
			primary: lightBlue,
			error: red,
			type: 'light'
		},
	});

	const themeDark = createMuiTheme({
		palette: {
			primary: lightBlue,
			error: red,
			type: 'dark'
		},
	});

	return (
		<Router>
			<div>
				<ThemeProvider theme={isThemeLight ? themeLight : themeDark}>
					<CssBaseline />
					<Route exact path='/' component={HomePage} />
					<Route exact path='/Login' component={Login}/>
					<Route exact path='/Settings' render={() => <Settings Mode={Mode} IsThemeLight={isThemeLight} />} />
					<Route exact path="/speech/:SpeechId" component={SpeechPage} />
				</ThemeProvider>
			</div>
		</Router>
	);
}
