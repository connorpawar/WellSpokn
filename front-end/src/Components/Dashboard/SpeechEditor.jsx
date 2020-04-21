import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';
import { useEditorState } from '../../CustomHooks/useEditorState'

import LoadingScreen from '../Layout/LoadingScreen';

const useStyles = makeStyles((theme) => ({
	button: {
	  margin: theme.spacing(1),
	},
  }));

export default function SpeechEditor(props) {
	const classes = useStyles();

	let speech = useSelector(state => state.currentSpeech);

	const {editorState, setEditorState, createDecorator, setContent, setErrors} = useEditorState(props.errors, props.counts, props.Content);

	React.useEffect(() => {
		setEditorState(EditorState.createWithContent(ContentState.createFromText(props.Content), createDecorator()))
		if(typeof speech.transcript === "string"){
			console.log("set")
			setErrors(speech.errors)
			setContent(speech.transcript);
			setEditorState(EditorState.createWithContent(ContentState.createFromText(speech.transcript), createDecorator()))
		}
	}, [speech])

	const [load, setLoad] = React.useState(false);

	const handleCorrection = (editorState) =>{
		setLoad(true);
		let content = editorState.getCurrentContent();
		let text = content.getPlainText();

		var form_data = new FormData();
			form_data.append('transcript', text);
			fetch('../api/speech_fix/' + props.id, {
				method: 'POST',
				body: form_data
			}).then(response => response.json())
			.then(JSONresponse => { 
				setEditorState(EditorState.createWithContent(ContentState.createFromText(JSONresponse.transcript), createDecorator()));
				props.setChangedSpeech(true); 
				setLoad(false);})
			.catch(error => console.log("fetch error", error));
	}

	return (
		<React.Fragment>
			<Editor
				editorState={editorState}
				onChange={setEditorState}
				stripPastedStyles={true}
			/>
			<Button
			variant="contained"
			color="default"
			className={classes.button}
			startIcon={<SaveIcon />}
			onClick={() =>{handleCorrection(editorState)}}
			>Save Changes</Button>
			<LoadingScreen loading={load}/>
	  </React.Fragment>
	);
}