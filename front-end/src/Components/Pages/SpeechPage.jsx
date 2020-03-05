import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NavBar from '../Layout/NavBar';
import BarGraph from '../Dashboard/BarGraph';
import SpeechEditor from '../Dashboard/SpeechEditor';
import NewAttempt from '../Layout/NewAttempt';
import TotalErrors from '../Dashboard/TotalErrors';
import ListOfErrors from '../Dashboard/ListOfErrors';
import Loader from '../Layout/Loader';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin: 30,
	},

});
export default function SpeechPage(props) {
	const classes = useStyles();

	const temp = {
		"id": "0",
		"name": "Something Went Wrong",
		"transcript": "Something went really wrong",
		"date_created": "2019-12-04",
		"date_last_modified": "2019-12-04",
		"previous_attempts": "0",
		"errors_by_attempt": [],
		"latest_error_count": "0",
		"errors": []
	}

	const [speech, setSpeech] = useState(temp);
	const [isBusy, setBusy] = useState(true);

	//props.history.location.state.id
	useEffect(() => {
		fetch('/api/speech/' + props.history.location.state.id)
			.then(response => response.json())
			.then(JSONresponse => {setSpeech(JSONresponse); setBusy(false)})
			.catch(error => console.log("fetch error", error));
	})

	const data = [
		{ "y": 8, "x": "Tempo" },
		{ "y": 4, "x": "Grammar" },
		{ "y": 5, "x": "Filler Words" },
		{ "y": 10, "x": "Repetition" },
		{ "y": 5, "x": "Monotone" },
	];

	return (
		<div>
			<NavBar />
			{ isBusy ? <Loader/> :
			<div id="cards">
				<Grid container spacing={2}
					direction="row"
					justify="flex-start"
					alignItems="baseline">
					<Grid item sm={6} xs={"auto"}>
						<Card className={classes.card}>
							<CardContent>
								<Typography component="h1" variant="h5" color="primary" gutterBottom>
									{speech.name}
								</Typography>
								<SpeechEditor Content={speech.transcript} />
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={6} xs={"auto"}>
						<Grid container spacing={2}>
							<Grid item sm={6} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<TotalErrors count="12" date="02/20/2020" />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={6} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										{/*change to pie chart*/}
										<TotalErrors count="12" date="02/20/2020" />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={12} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										{/*line graph*/}
										<b>Placeholder Error Metrics</b>
										<BarGraph data={data} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={12} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<ListOfErrors />
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
			}
			<NewAttempt setTranscript={speech.transcript} />
		</div>
	);
}
