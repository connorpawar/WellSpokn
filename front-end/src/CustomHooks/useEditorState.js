import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';

export const useEditorState = (Errors, Counts, Content) => {

	const [errors, setErrors] = React.useState(Errors);
	const [content, setContent] = React.useState(Content);

	const HighlightedErrors = (props) => {

		let highlightColor = "red"
		let description = ""
		let text = ""

		errors.forEach(error => { //can't break/return out of foreach should change later
			if (props.start === parseInt(error.start) && props.end === parseInt(error.end)) {
				for(let i = 0; i < props.Counts.length; i++){
					if (error.type === props.Counts[i].type) {
						highlightColor = props.Counts[i].color;
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

	const highlightErrors = (errors, contentBlock, callback) => {
		errors.forEach(error => {
			callback(parseInt(error.start), parseInt(error.end));
		});
	}

	const handleErrors = (contentBlock, callback) => {
		highlightErrors(errors, contentBlock, callback);
	}

	const createDecorator = () =>
		new CompositeDecorator([
			{
				strategy: handleErrors,
				component: HighlightedErrors,
				props: { errors, Counts }
			},
		]);

	const [editorState, setEditorState] = React.useState(
		EditorState.createWithContent(ContentState.createFromText(content), createDecorator())
	);

	return { editorState, setEditorState, createDecorator, setContent, setErrors}
}