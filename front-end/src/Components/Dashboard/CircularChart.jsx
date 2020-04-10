import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

export default function CircularChart(props) {

	const data = {
		labels: [
			'Tempo',
			'Grammar',
			'Filler Words',
			'Repetition',
			'Tone'
		],
		datasets: [{
			data: props.data.map(x => x.count),
			backgroundColor: [
				'#FF6384',
				'#4BC0C0',
				'#FFCE56',
				'#E7E9ED',
				'#36A2EB'
			],
			hoverBackgroundColor: [
				'#FF6384',
				'#4BC0C0',
				'#FFCE56',
				'#E7E9ED',
				'#36A2EB'
			]
		}]
	};

	const chartWidth = 180;
	const chartHeight = 180;

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5" color="primary" gutterBottom>
				Error Breakdown
			</Typography>
			<Doughnut
				data={data}
				width={chartWidth}
				height={chartHeight}
				options={{ maintainAspectRatio: false }}
			/>
		</React.Fragment>
	);
}