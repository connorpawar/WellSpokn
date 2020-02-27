import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function NewSpeechForm(props) {
	const [state, setState] = React.useState({
		tempo: true,
		grammar: true,
		filler: true,
		repitition: true,
		monotone: true,
	});

	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
	};

	return (
		<FormControl style={{margin:"10px"}} margin="dense" component="fieldset">
			<FormLabel disabled={true} component="legend">What error types we should check for?</FormLabel>
			<FormGroup>
				<FormControlLabel
					control={<Switch checked={state.tempo} onChange={handleChange('tempo')} color="primary" value="tempo" />}
					label="Tempo"
				/>
				<FormControlLabel
					control={<Switch checked={state.grammar} onChange={handleChange('grammar')} color="primary" value="grammar" />}
					label="Grammar"
				/>
				<FormControlLabel
					control={<Switch checked={state.filler} onChange={handleChange('filler')} color="primary" value="filler" />}
					label="Filler Words"
				/>
				<FormControlLabel
					control={<Switch checked={state.repitition} onChange={handleChange('repitition')} color="primary" value="repitition" />}
					label="Repitition"
				/>
				<FormControlLabel
					control={<Switch checked={state.monotone} onChange={handleChange('monotone')} color="primary" value="monotone" />}
					label="Monotone Sections"
				/>
			</FormGroup>
		</FormControl>
	);
}