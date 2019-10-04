import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import ListDividers from './ListDividers';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin: 30,
	}
});
export default function SpeechPage(props) {
	const classes = useStyles();

	const [show, setShow] = useState(props.history.location.state.show);

	const hideMenu = () => {
		return (show) ? setShow(false) : setShow(true);
	}

	return (
		<div>
			<NavBar Show={hideMenu}/>
			<Grid container spacing={0}
				direction="row"
				justify="flex-start"
				alignItems="stretch">
				{show && <Grid item xs={2}>
					<ListDividers/>
				</Grid>}
				{show && <Grid item xs={10}>
					<div id="cards">
						<Grid container spacing={2}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
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
					</div>
				</Grid>}
				{!show && <div id="cards">
					<Grid container spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="baseline">
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
				</div>}
			</Grid>
		</div>
	);
}
