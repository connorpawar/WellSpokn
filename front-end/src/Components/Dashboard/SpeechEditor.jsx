import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';

import LoadingScreen from '../Layout/LoadingScreen';

const useStyles = makeStyles((theme) => ({
	button: {
	  margin: theme.spacing(1),
	},
  }));

export default function SpeechEditor(props) {
	const classes = useStyles();

	let counts = props.counts;

	const [errors, setErrors] = React.useState(props.errors);
	const [load, setLoad] = React.useState(false);

	const handleCorrection = (editorState) =>{
		let content = editorState.getCurrentContent();
		let text = content.getPlainText();

		var form_data = new FormData();
			form_data.append('transcript', text);
			fetch('../api/speech_fix/' + props.id, {
				method: 'POST',
				body: form_data
			}).then(response => response.json())
			.then(JSONresponse => {props.setChangedSpeech(true); setLoad(false);})
			.catch(error => console.log("fetch error", error));
	}

	const HighlightedErrors = (props) => {

		let highlightColor = "red"
		let description = ""
		let text = ""

		props.errors.forEach(error => { //can't break/return out of foreach should change later
			if (props.start === parseInt(error.start) && props.end === parseInt(error.end)) {
				for(let i = 0; i < props.counts.length; i++){
					if (error.type === props.counts[i].type) {
						highlightColor = props.counts[i].color;
						break;
					}
				}
				description = error.description;
				text = props.children;
			}
		})
		return (
			<Tooltip title={description} placement="top" interactive arrow>
				<span style={{ background: highlightColor }}>{text}</span>
			</Tooltip >
		)
	};

	function highlightErrors(errors, contentBlock, callback) {
		const text = contentBlock.getText();
		errors.forEach(error => {
			callback(parseInt(error.start), parseInt(error.end));
		});
	}

	function handleErrors(contentBlock, callback) {
		highlightErrors(props.errors, contentBlock, callback);
	}



	const createDecorator = () =>
		new CompositeDecorator([
			{
				strategy: handleErrors,
				component: HighlightedErrors,
				props: { errors, counts }
			},
		]);

	const [editorState, setEditorState] = React.useState(
		EditorState.createWithContent(ContentState.createFromText(props.Content), createDecorator())
	);

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