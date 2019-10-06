import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import NewSpeech from './NewSpeech';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	cards: {
		height: '89vh'
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: '25px'
	},
	p: {
		textIndent: '40px'
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
	const createData = (id, name, content) => {
		return { id, name, content };
	}

	const speeches = [
		createData(0, 'Fall of the Roman Empire', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(1, 'The Civil War', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(2, 'The Vietnam War', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(3, 'How The First Clock Was Created', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(4, 'My Favorite Gingerbread Recipes', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(5, 'Why Malai Kofta Is Delicious', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(6, 'How I Ran Out Of Ideas', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(7, 'The Korean War', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(8, 'When Should I Stop', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
		createData(9, 'I Think This Is Enough', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
	];

	const classes = useStyles();

	const [show, setShow] = useState(false);

	const [speechCards, setSpeechCards] = useState(speeches);

	const hideMenu = () => {
		return (show) ? setShow(false) : setShow(true);
	}

	const searchSpeeches = (searchTerm) => {
		let searchedSpeeches = speeches.filter(speech => (speech.name.toLowerCase().includes(searchTerm.toLowerCase())));
		return setSpeechCards(searchedSpeeches);
	}


	return (
		<div>
			<NavBar SearchSpeeches={searchSpeeches} />
				<div id="cards">
					<Grid container spacing={0}
						direction="row"
						justify="flex-start"
						alignItems="baseline">
						{speechCards.map(speech => (
							<Grid key={speech.id} item xs={3}>
								<Link style={{ textDecoration: 'none' }} to={{
									pathname: `/speech/${speech.id}`,
									state: { name: speech.name, content: speech.content, show: false }
								}}>
									<Card className={classes.paper}>
										<CardActions>
											<ButtonBase>
												<CardContent>
													<b>{speech.name}</b><br />
													<p className={classes.p} align="left">{speech.content.substring(0, 255) + '...'}</p>
												</CardContent>
											</ButtonBase>
										</CardActions>
									</Card>
								</Link>
							</Grid>
						))}
					</Grid>
				</div>
			<NewSpeech />
		</div>
	);
}