import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NavBar from '../Layout/NavBar';
import LineGraph from '../Dashboard/LineGraph';
import BarGraph from '../Dashboard/BarGraph';
import SpeechEditor from '../Dashboard/SpeechEditor';
import NewAttempt from '../Layout/NewAttempt';
import TotalErrors from '../Dashboard/TotalErrors';
import ListOfErrors from '../Dashboard/ListOfErrors';
import CircularChart from '../Dashboard/CircularChart';
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

	let counts = [];

	let colors = [
		'#FF6384',
		'#4BC0C0',
		'#FFCE56',
		'#36A2EB',
		'#E7E9ED',
	];

	let colorIter = 0;

	let error_types = new Set();

	const [speech, setSpeech] = useState(temp);
	const [isBusy, setBusy] = useState(true);
	const [changedSpeech, setChangedSpeech] = useState(true);

	useEffect(() => { //currently reloads multiple times after updating attempt, need to fix later.
		console.log(changedSpeech)
		if(changedSpeech){
			fetch('/api/speech/' + props.history.location.state.id)
			.then(response => response.json())
			.then(JSONresponse => {setSpeech(JSONresponse); setChangedSpeech(false); setBusy(false)})
			.catch(error => console.log("fetch error", error));
		}
	}, [changedSpeech])

//merges the types and counts of each error into the counts array
	speech.errors.forEach(x =>{
		if(!error_types.has(x.type)){
			error_types.add(x.type);
			counts.push({"count": 1, "type": x.type, "color": colors[colorIter]})
			colorIter++;
			colorIter = colorIter % 5;
		} else{
			for(let i = 0; i < counts.length; i++){
				if(counts[i].type == x.Type){
					counts[i].count++;
					break;
				}
			}
		}
	});


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
								<SpeechEditor Content={speech.transcript} errors={speech.errors} counts={counts} />
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={6} xs={"auto"}>
						<Grid container spacing={2}>
							<Grid item sm={6} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<TotalErrors count={speech.latest_error_count} date={speech.date_last_modified} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={6} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<CircularChart data={counts} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={12} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<LineGraph data={speech} counts={counts} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={12} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<BarGraph data={counts} />
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={12} xs={12}>
								<Card className={classes.card}>
									<CardContent>
										<ListOfErrors data={speech.errors} />
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
			}
			<NewAttempt id={speech.id} setChangedSpeech={setChangedSpeech}/>
		</div>
	);
}
