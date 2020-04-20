import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useNewSpeech } from '../../CustomHooks/useNewSpeech';
import NewSpeechModal from '../Speech_Creation/NewSpeechModal';
import LoadingScreen from './LoadingScreen';

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'fixed',
		margin: theme.spacing(1),
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

export default function NewSpeech(props) {
	const classes = useStyles();

	const [loading, setLoading] = React.useState(false);
	
	const { open, selectedValue, handleClickOpen, handleClose } = useNewSpeech(props.setReload);

	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<NewSpeechModal setReload={props.setReload} setLoading={setLoading} selectedValue={selectedValue} open={open} onClose={handleClose} />
			<LoadingScreen loading={loading}/>
		</div>
	);
}