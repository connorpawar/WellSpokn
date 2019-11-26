import React from 'react';
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

	const [transcript, setTranscript] = useState(props.history.location.state.content);

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
								<b>{props.history.location.state.name}</b><br />
								{/*<p className={classes.p} align="left">{props.history.location.state.content}</p>*/}
								<SpeechEditor Content={transcript} />
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
			<NewSpeech setTranscript={setTranscript}/>
		</div>
	);
}
