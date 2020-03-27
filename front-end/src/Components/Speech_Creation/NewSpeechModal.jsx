import React from 'react';
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

import Recorder from './Recorder';
import Dropzone from './Dropzone';
import NewSpeechForm from './NewSpeechForm';

import {useNewSpeechModal} from '../../CustomHooks/useNewSpeechModal';

const options = ['Record New Speech', 'Upload Existing Speech'];
const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
	form: {
		marginLeft: 50,
		marginRight: 50,
	},
}));

export default function NewSpeechModal(props) {
	const classes = useStyles();
	const { onClose, selectedValue, open } = props;

	const { record, upload, handleClose, handleListItemClick } = useNewSpeechModal(onClose, selectedValue);

	const [title, setTitle] = React.useState("");


	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			{!record && !upload &&
				<div>
					<DialogTitle id="simple-dialog-title">Create New Project</DialogTitle>
					<NewSpeechForm setSpeechTitle={setTitle} className={classes.form} />
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
				</div>}
			{record &&
				<div>
					<DialogTitle id="simple-dialog-title">Record New Speech</DialogTitle>
					<Recorder title={title} setTranscript={props.setTranscript}/>
				</div>
			}
			{upload &&
				<div>
					<Dropzone title={title} onFilesAdded={console.log} />
				</div>
			}
		</Dialog>
	);
}
