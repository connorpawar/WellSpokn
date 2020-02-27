import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Chip from '@material-ui/core/Chip';

import NavBar from '../Layout/NavBar';
import NewSpeech from '../Layout/NewSpeech';

import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	cards: {
		height: '89vh',
		color: theme.palette.secondary,
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: '25px'
	},
	p: {
		textIndent: '40px',
		marginTop: '20px',
		marginRight: '10px',
		marginLeft: '10px',
		marginBottom: '35px',
	},
	date: {
		position: 'absolute',
		bottom: theme.spacing(2),
		left: theme.spacing(2),
	},
	error: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	ButtonBase: {
		width: '100%',
		height: '100%',
	},
	CardContent: {
		padding: '15px',
		width: '100%',
		height: '100%',
	},
}));

export default function HomePage() {
	const createData = (id, name, transcript_preview, date_created, date_last_modified, error_count) => {
		return { id, name, transcript_preview, date_created, date_last_modified, error_count };
	}

	const speeches = [
		createData(9, 'Something Went Wrong', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.', '2019-10-01', '2019-10-01', 4),
	];

	const classes = useStyles();

	const [speechCards, setSpeechCards] = useState(speeches);

	const searchSpeeches = (searchTerm) => {
		let searchedSpeeches = speechCards.filter(speech => (speech.name.toLowerCase().includes(searchTerm.toLowerCase())));
		return setSpeechCards(searchedSpeeches);
	}

	const sortSpeeches = (sortTerm) => {
		let sortedSpeeches = [];
		if (sortTerm === 'name') {
			sortedSpeeches = speechCards.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		} else if (sortTerm === 'created') {
			sortedSpeeches = speechCards.slice().sort((a, b) => (a.date_created > b.date_created) ? -1 : ((b.date_created > a.date_created) ? 1 : 0));
		} else if (sortTerm === 'updated') {
			sortedSpeeches = speechCards.slice().sort((a, b) => (a.date_last_modified > b.date_last_modified) ? 1 : ((b.date_last_modified > a.date_last_modified) ? -1 : 0));
		}
		return setSpeechCards(sortedSpeeches);
	}

	useEffect(() => {
		fetch('api/speech_previews')
		.then(response => response.json())
		.then(JSONresponse => setSpeechCards(JSONresponse.speeches))
		.catch(error => console.log("fetch error", error));
	}, [])

	return (
		<div>
			<NavBar SearchSpeeches={searchSpeeches} SortSpeeches={sortSpeeches} />
			<div id="cards">
				<Grid container spacing={0}
					direction="row"
					justify="flex-start"
					alignItems="baseline">
					{speechCards.map((speech, index) => (
						 <Grow
						 in={true}
						 style={{ transformOrigin: '0 0 0' }}
						 timeout={index*500 }
					   >
						<Grid key={speech.id} item sm={3} xs={"auto"} zeroMinWidth>
							<Link style={{ textDecoration: 'none' }} to={{
								pathname: `/speech/${speech.id}`,
								state: { id:speech.id, show: false }
							}}>
								<Card className={classes.paper}>
									<CardActions>
										<ButtonBase>
											<CardContent>
												<b>{speech.name}</b>
												<p className={classes.p} align="left">{speech.transcript_preview}</p>
												<Chip className={classes.date} size="small" label={speech.date_created} />
												<Chip className={classes.error} size="small" label={speech.error_count + ' Errors Found!'} icon={<ErrorOutlineIcon />} />
											</CardContent>
										</ButtonBase>
									</CardActions>
								</Card>
							</Link>
						</Grid>
						</Grow>
					))}
				</Grid>
			</div>
			<NewSpeech />
		</div>
	);
}