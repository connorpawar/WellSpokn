import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

export default function FilterSpeeches(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose(){
		setAnchorEl(null);
	}

	function handleSort(name){
		props.Sort(name);
		handleClose();
	}

	return (
		<div>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
				<FilterListIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={ () => handleSort("name") }>Name</MenuItem>
				<MenuItem onClick={ () => handleSort("created") }>Date Created</MenuItem>
				<MenuItem onClick={ () => handleSort("updated") }>Last Updated</MenuItem>
			</Menu>
		</div>
	);
}
