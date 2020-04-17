import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		background: 'rgba(211,211,211,0.5)',
		height: '100%'
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	  },
}));

export default function DrawerList() {
	const classes = useStyles();

	return (
		<List component="nav" className={classes.root} aria-label="mailbox folders">
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: `/Login` }}>
				<ListItem button>
					<ListItemAvatar>
						<Avatar className={classes.bigAvatar}>
							C
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="@ConnorPawar" secondary="Premium Member"/>
				</ListItem>
			</Link>
			<Divider />
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: `/Speeches` }}>
				<ListItem button>
					<ListItemAvatar>
						<Avatar className={classes.avatar}>
							<RecordVoiceOverIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Speeches" />
				</ListItem>
			</Link>
			<Divider />
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: `/Settings` }}>
				<ListItem button divider>
					<ListItemAvatar>
						<Avatar className={classes.avatar}>
							<SettingsIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Settings" />
				</ListItem>
			</Link>
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: `/Logout` }}>
				<ListItem button divider>
					<ListItemAvatar>
						<Avatar className={classes.avatar}>
							<PersonIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Log Out" />
				</ListItem>
			</Link>
		</List >
	);
}