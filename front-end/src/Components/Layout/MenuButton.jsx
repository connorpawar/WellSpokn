import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

export default function MenuButton(props) {
	const classes = useStyles();

	function handleClick(event) {
		props.Show();
	}

	return (
		<div>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open-drawer" onClick={handleClick}>
				<MenuIcon />
			</IconButton>
		</div>
	);
}
