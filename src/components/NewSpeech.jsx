import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import UploadIcon from '@material-ui/icons/Publish';
import MicIcon from '@material-ui/icons/Mic';
import { blue } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const options = ['Record New Speech', 'Upload Existing Speech'];
const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
	fab: {
		position: 'fixed',
		margin: theme.spacing(1),
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function SimpleDialog(props) {
	const classes = useStyles();
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = value => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">Create New Project</DialogTitle>
			<List>
				{options.map(option => (
					<ListItem button onClick={() => handleListItemClick(option)} key={option}>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								{option === 'Record New Speech' && <MicIcon />}
								{option === 'Upload Existing Speech' && <UploadIcon />}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={option} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function NewSpeech() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(options[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = value => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
		</div>
	);
}