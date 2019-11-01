import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

export default function MyEditor(props) {
	const [editorState, setEditorState] = React.useState(
		EditorState.createWithContent(ContentState.createFromText(props.Content))
	);

	return (
		<Editor
			editorState={editorState}
			onChange={setEditorState}

		/>
	);
}