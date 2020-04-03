import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	date: {
		flex: 1,
	},
	count: {
		marginTop: 65,
		marginBottom: 65
	},
});

export default function TotalErrors(props) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography component="h1" variant="h5" color="primary" gutterBottom>
				Total Error Count
    	</Typography>
			<Typography align="center" component="p" variant="h1" className={classes.count}>
				{props.count}
			</Typography>
			<Typography align="right" color="textSecondary" className={classes.date}>
				{props.date}
			</Typography>
		</React.Fragment>
	);
}