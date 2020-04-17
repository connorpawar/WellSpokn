import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';


export default function SpeechEditor(props) {

	let counts = props.counts;

	const [errors, setErrors] = React.useState(props.errors);

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
		<Editor
			editorState={editorState}
			onChange={setEditorState}
		/>
	);
}