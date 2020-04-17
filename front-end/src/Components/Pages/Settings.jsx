import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import NavBar from '../Layout/NavBar';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin: 30,
	},
});
export default function Settings(props) {
	const classes = useStyles();

	const [state, setState] = React.useState({
		dark: !props.IsThemeLight,
	});

	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
		props.Mode(state.dark);
	};

	return (
		<div>
			<NavBar />
			<div id="cards">
				<Grid container spacing={2}
					direction="row"
					justify="center"
					alignItems="baseline">
					<Grid item xs={"auto"}>
						<Card className={classes.card}>
							<CardContent>
								<FormControl component="fieldset">
									<FormLabel component="legend">Settings</FormLabel>
									<FormControlLabel
										control={<Switch checked={state.dark} onChange={handleChange('dark')} value="dark" />}
										label="Dark Mode"
									/>
									<FormHelperText>Everything Needs Dark Mode</FormHelperText>
								</FormControl>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}