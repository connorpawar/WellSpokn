import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { makeStyles } from '@material-ui/core/styles';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';


const errors = {
	"errorsArr": [{ "Type": "Filler", "Start": "10", "End": "34", "Description": "This is a description #1" },
	{ "Type": "Tempo", "Start": "200", "End": "286", "Description": "This is a description #2" },
	{ "Type": "Grammar", "Start": "452", "End": "534", "Description": "This is a description #3" },
	{ "Type": "Grammar", "Start": "850", "End": "936", "Description": "This is a description #4" },
	{ "Type": "Tone", "Start": "1149", "End": "1236", "Description": "This is a description #5" }]
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(0),
	},
	input: {
		display: 'none',
	},
}));

const HighlightedErrors = (props) => {
	const classes = useStyles();

	let highlightColor = "red"
	let description = ""
	let text = ""

	props.errors.errorsArr.forEach(error => { //can't break/return out of foreach should change later
		if (props.start == parseInt(error.Start) && props.end == parseInt(error.End)) {
			if (error.Type == "Tone") {
				highlightColor = "PaleGoldenRod"
			} else if (error.Type == "Tempo") {
				highlightColor = "LightSalmon"
			} else if (error.Type == "Grammar") {
				highlightColor = "Pink"
			} else if (error.Type == "Filler") {
				highlightColor = "SkyBlue"
			}
			description = error.Description;
			text = props.children;
		}
	})
	return (
		<Tooltip title={
			<React.Fragment>
				<IconButton className={classes.button} color="primary">
					<PlayCircleFilledIcon />
				</IconButton>
				{description}
			</React.Fragment>
	} placement = "top" interactive>
	<span style={{ background: highlightColor }}>{text}</span>
		</Tooltip >
	)
};

function highlightErrors(errors, contentBlock, callback) {
	const text = contentBlock.getText();
	errors.errorsArr.forEach(error => {
		callback(parseInt(error.Start), parseInt(error.End));
	});
}

function handleErrors(contentBlock, callback) {
	highlightErrors(errors, contentBlock, callback);
}



const createDecorator = () =>
	new CompositeDecorator([
		{
			strategy: handleErrors,
			component: HighlightedErrors,
			props: { errors }
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