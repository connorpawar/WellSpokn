import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useNewAttempt } from '../../CustomHooks/useNewAttempt';
import NewAttemptModal from '../Speech_Creation/NewAttemptModal'

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'fixed',
		margin: theme.spacing(1),
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

export default function NewAttempt(props) {
	const classes = useStyles();
	
	const { open, selectedValue, handleClickOpen, handleClose } = useNewAttempt();

	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<NewAttemptModal selectedValue={selectedValue} open={open} onClose={handleClose} id={props.id} setChangedSpeech={props.setChangedSpeech} />
		</div>
	);
}