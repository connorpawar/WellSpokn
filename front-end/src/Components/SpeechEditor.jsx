import React from 'react';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';


const errors = {
	"errorsArr": [{ "Type": "Filler", "Start": "10", "End": "34" },
	{ "Type": "Tempo", "Start": "200", "End": "286" },
	{ "Type": "Grammar", "Start": "452", "End": "534" },
	{ "Type": "Grammar", "Start": "850", "End": "936" },
	{ "Type": "Tone", "Start": "1149", "End": "1236" }]
};

//const errors = JSON.parse(errorsJSON);

const Filler = (props) => {
	return <span style={{ background: "SkyBlue" }}>{props.children}</span>;
};

function highlightFiller(errors, contentBlock, callback) {
	const text = contentBlock.getText();
	errors.errorsArr.forEach(error => {
		if(error.Type == "Filler"){
			callback(parseInt(error.Start), parseInt(error.End));
		}
	});
}

function handleFiller(contentBlock, callback) {
	highlightFiller(errors, contentBlock, callback);
}


const Grammar = (props) => {
	return <span style={{ background: "pink" }}>{props.children}</span>;
};

function highlightGrammar(errors, contentBlock, callback) {
	const text = contentBlock.getText();
	errors.errorsArr.forEach(error => {
		if(error.Type == "Grammar"){
			callback(parseInt(error.Start), parseInt(error.End));
		}
	});
}

function handleGrammar(contentBlock, callback) {
	highlightGrammar(errors, contentBlock, callback);
}

const Tempo = (props) => {
	return <span style={{ background: "LightSalmon" }}>{props.children}</span>;
};

function highlightTempo(errors, contentBlock, callback) {
	const text = contentBlock.getText();
	errors.errorsArr.forEach(error => {
		if(error.Type == "Tempo"){
			callback(parseInt(error.Start), parseInt(error.End));
		}
	});
}

function handleTempo(contentBlock, callback) {
	highlightTempo(errors, contentBlock, callback);
}

const Tone = (props) => {
	return <span style={{ background: "PaleGoldenRod" }}>{props.children}</span>;
};

function highlightTone(errors, contentBlock, callback) {
	const text = contentBlock.getText();
	errors.errorsArr.forEach(error => {
		if(error.Type == "Tone"){
			callback(parseInt(error.Start), parseInt(error.End));
		}
	});
}

function handleTone(contentBlock, callback) {
	highlightTone(errors, contentBlock, callback);
}

const createDecorator = () =>
	new CompositeDecorator([
		{
			strategy: handleFiller,
			component: Filler
		},
		{
			strategy: handleGrammar,
			component: Grammar
		},
		{
			strategy: handleTempo,
			component: Tempo
		},
		{
			strategy: handleTone,
			component: Tone
		},
	]);

export default function MyEditor(props) {

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