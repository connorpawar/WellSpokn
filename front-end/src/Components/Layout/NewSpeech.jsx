import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useNewSpeech } from '../../CustomHooks/useNewSpeech';
import NewSpeechModal from '../Speech_Creation/NewSpeechModal'

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'fixed',
		margin: theme.spacing(1),
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

export default function NewSpeech() {
	const classes = useStyles();
	
	const { open, selectedValue, handleClickOpen, handleClose } = useNewSpeech();

	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<NewSpeechModal selectedValue={selectedValue} open={open} onClose={handleClose} />
		</div>
	);
}