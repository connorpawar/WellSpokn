import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import NavBar from './../NavBar';
import BarGraph from './../BarGraph';
import SpeechEditor from './../SpeechEditor';
import NewSpeech from '../NewSpeech';

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

	const temp = {
		"id": "0",
		"name": "Something Went Wrong",
		"transcript": "Something went really wrong",
		"date_created": "2019-12-04",
		"date_last_modified": "2019-12-04",
		"previous_attempts": "0",
		"errors_by_attempt": [],
		"latest_error_count": "0",
		"errors":[]
	}

	const [speech, setSpeech] = useState(temp);

	//props.history.location.state.id
	useEffect(() => {
		fetch('/api/speech?'+props.history.location.state.id)
		.then(response => response.json())
		.then(JSONresponse => setSpeech(JSONresponse))
		.catch(error => console.log("fetch error", error));
	}, [props.history.location.state.id])

	const data = [
		{ "y": 8, "x": "Tempo" },
		{ "y": 4, "x": "Grammar" },
		{ "y": 5, "x": "Filler Words" },
		{ "y": 10, "x": "Repetition" },
		{ "y": 5, "x": "Monotone" },
	];

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
							<CardContent>
								<b>{speech.name}</b><br />
								{/*<p className={classes.p} align="left">{props.history.location.state.content}</p>*/}
								<SpeechEditor Content={speech.transcript} />
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={6} xs={"auto"}>
						<Grid container spacing={2}>
							<Grid item sm={"auto"} xs={"auto"}>
								<Card className={classes.card}>
									<CardContent>
										<b>Placeholder Error Metrics</b>
										<BarGraph data={data} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={"auto"} xs={"auto"}>
								<Card className={classes.card}>
									<CardContent>
										<b>Placeholder Error Metrics</b>
										<BarGraph data={data} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={"auto"} xs={"auto"}>
								<Card className={classes.card}>
									<CardContent>
										<b>Placeholder Error Metrics</b>
										<BarGraph data={data} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={"auto"} xs={"auto"}>
								<Card className={classes.card}>
									<CardContent>
										<b>Placeholder Error Metrics</b>
										<BarGraph data={data} />
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
			<NewSpeech setTranscript={speech.transcript}/>
		</div>
	);
}
