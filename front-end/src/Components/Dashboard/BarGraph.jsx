import React from 'react';
import Typography from '@material-ui/core/Typography';
import { HorizontalBar } from 'react-chartjs-2';

const graphData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: []
		}
	]
};

export default function BarGraph(props) {
	let graphData = {
		labels: ['Tempo', 'Grammar', 'Filler Words', 'Repetition', 'Tone'],
		datasets: [
			{
				label: 'Count',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: props.data.map(x => x.count)
			}
		]
	};
	return (
		<React.Fragment>
			<Typography component="h1" variant="h5" color="primary" gutterBottom>
					Error Counts
			</Typography>
			<HorizontalBar data={graphData} />
		</React.Fragment>
	);
}