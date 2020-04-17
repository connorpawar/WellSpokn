import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useNewAttempt } from '../../CustomHooks/useNewAttempt';
import NewAttemptModal from '../Speech_Creation/NewAttemptModal';
import LoadingScreen from './LoadingScreen';

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

	const [loading, setLoading] = React.useState(false);

	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<NewAttemptModal selectedValue={selectedValue} open={open} onClose={handleClose} 
			setLoading={setLoading} id={props.id} setChangedSpeech={props.setChangedSpeech} />
			<LoadingScreen loading={loading}/>
		</div>
	);
}