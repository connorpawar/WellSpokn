import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

export default function NewSpeechForm(props) {
	const [title, setTitle] = React.useState("");

	const handleChange = event => {
		setTitle(event.target.value);
	};

	return (
		<FormControl style={{ margin: "10px" }} margin="dense" component="fieldset">
			<FormLabel disabled={true} component="legend">Lets Get Started!</FormLabel>
			<br/>
			<FormGroup>
				<TextField
					error={title === ""}
					required
					id="outlined-required"
					label="Title"
					defaultValue=""
					variant="outlined"
					onChange={handleChange}
				/>
			</FormGroup>
		</FormControl>
	);
}