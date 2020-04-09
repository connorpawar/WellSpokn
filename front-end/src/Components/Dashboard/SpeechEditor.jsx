import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';


export default function SpeechEditor(props) {

	const [errors, setErrors] = React.useState(props.errors);

	const HighlightedErrors = (props) => {

		let highlightColor = "red"
		let description = ""
		let text = ""

		props.errors.forEach(error => { //can't break/return out of foreach should change later
			if (props.start === parseInt(error.Start) && props.end === parseInt(error.End)) {
				if (error.Type === "Tone") {
					highlightColor = "PaleGoldenRod"
				} else if (error.Type === "Tempo") {
					highlightColor = "LightSalmon"
				} else if (error.Type === "Grammar") {
					highlightColor = "Pink"
				} else if (error.Type === "Filler") {
					highlightColor = "SkyBlue"
				}
				description = error.Description;
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
			callback(parseInt(error.Start), parseInt(error.End));
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
				props: { errors }
			},
		]);

	const [editorState, setEditorState] = React.useState(
		EditorState.createWithContent(ContentState.createFromText(props.Content), createDecorator())
	);

	return (
		<Editor
			editorState={editorState}
			onChange={setEditorState}
		/>
	);
}