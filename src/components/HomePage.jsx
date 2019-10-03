import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import ListDividers from './ListDividers';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	cards: {
		height: '89vh'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: '15px'
	},
	p: {
		textIndent: '40px'
	}
}));

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

export default function HomePage() {
	const classes = useStyles();


	const [show, setShow] = useState(false);

	const hideMenu = () => {
		return (show) ? setShow(false) : setShow(true);
	}

	return (
		<div>
			<NavBar Show={hideMenu} />
			<Grid container spacing={0}
				direction="row"
				justify="flex-start"
				alignItems="stretch">
				{show && <Grid item xs={2}>
					<ListDividers />
				</Grid>}
				{show && <Grid item xs={10}>
					<div id="cards">
						<Grid container spacing={2}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{speeches.map(speech => (
								<Grid key={speech.id} item xs={3}>
									<Card className={classes.paper}>
										<b>{speech.name}</b><br />
										<p className={classes.p} align="left">{speech.content.substring(0, 255) + '...'}</p>
									</Card>
								</Grid>
							))}
						</Grid>
					</div>
				</Grid>}
				{!show && <div id="cards">
					<Grid container spacing={2}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
						{speeches.map(speech => (
							<Grid key={speech.id} item xs={3}>
								<Card className={classes.paper}>
									<b>{speech.name}</b><br />
									<p className={classes.p} align="left">{speech.content.substring(0, 255) + '...'}</p>
								</Card>
							</Grid>
						))}
					</Grid>
				</div>}
				</Grid>
		</div>
	);
}