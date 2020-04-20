import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

export default function CircularChart(props) {

	const data = {
		labels: props.data.map(x => x.type),
		datasets: [{
			data: props.data.map(x => x.count),
			backgroundColor: props.data.map(x => x.color),
			hoverBackgroundColor: props.data.map(x => x.color),
		}]
	};

	const chartWidth = 205;
	const chartHeight = 205;

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