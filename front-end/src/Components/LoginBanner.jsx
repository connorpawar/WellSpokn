import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	}
}));

export default function LoginBanner() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						WellSpokn
          			</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}