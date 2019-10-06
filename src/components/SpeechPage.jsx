import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin: 30,
	},
});
export default function SpeechPage(props) {
	const classes = useStyles();

	const searchSpeeches = (searchTerm) => {
		//will eventually look for word and highlight
	}

	return (
		<div>
			<NavBar SearchSpeeches={searchSpeeches} />
			<div id="cards">
				<Grid container spacing={2}
					direction="row"
					justify="flex-start"
					alignItems="baseline">
					<Grid item sm={6} xs={"auto"}>
						<Card className={classes.card}>
							<CardActions>
								<ButtonBase>
									<CardContent>
										<b>{props.history.location.state.name}</b><br />
										<p className={classes.p} align="left">{props.history.location.state.content}</p>
									</CardContent>
								</ButtonBase>
							</CardActions>
						</Card>
					</Grid>
					<Grid item sm={6} xs={"auto"}>
						<Card className={classes.card}>
							<CardActions>
								<ButtonBase>
									<CardContent>
										<b>Metrics Card</b><br />
										<p className={classes.p} align="left">{props.history.location.state.content}</p>
									</CardContent>
								</ButtonBase>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
