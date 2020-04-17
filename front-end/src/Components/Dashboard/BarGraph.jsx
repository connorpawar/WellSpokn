import React from 'react';
import Typography from '@material-ui/core/Typography';
import { HorizontalBar } from 'react-chartjs-2';

export default function BarGraph(props) {
	let data = props.data;
	data.unshift({"count": 0, "type": "", "color": ""});
	let graphData = {
		labels: data.map(x => x.type),
		datasets: [
			{
				label: 'Count',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: data.map(x => x.count)
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