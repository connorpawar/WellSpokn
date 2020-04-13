import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

export default function LineGraph(props) {

	let colors = props.counts.map(x => x.color);

	let errorTypes = props.counts.map(x => x.type);

	console.log(errorTypes);

	let dataSets = [];
	let colorIter = 0;

	errorTypes.forEach(x =>{
		dataSets.push({
			label: x,
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: colors[colorIter],
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: colors[colorIter],
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: colors[colorIter],
			pointHoverBorderColor:  colors[colorIter],
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: []
		});
		colorIter++;
		colorIter = colorIter % 5;
	})

	let graphData = {
		labels: [],
		datasets: dataSets
	  };

	let attemptNum = 1;

	props.data.errors_by_attempt.forEach(x =>{
		graphData.labels.push("Attempt #" + attemptNum.toString());

		for(let i = 0; i < errorTypes.length; i++){
			let err = errorTypes[i];
			if(err in x){
				graphData.datasets[i].data.push(x[err]);
			} else {
				graphData.datasets[i].data.push(0);
			}
		}
		attemptNum++;
	});

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5" color="primary" gutterBottom>
					Errors By Attempt
			</Typography>
			<Line data={graphData} />
		</React.Fragment>
	);
}