import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

export default function LineGraph(props) {
	let graphData = {
		labels: [],
		datasets: [
		  {
			  label: 'Tempo',
			  fill: false,
			  lineTension: 0.1,
			  backgroundColor: 'rgba(75,192,192,0.4)',
			  borderColor: '#FF6384',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: '#FF6384',
			  pointBackgroundColor: '#fff',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: '#FF6384',
			  pointHoverBorderColor: '#FF6384',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: []
			},
		  {
			label: 'Grammar',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: '#4BC0C0',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: '#4BC0C0',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: '#4BC0C0',
			pointHoverBorderColor: '#4BC0C0',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: []
		  },
		  {
			  label: 'Filler Words',
			  fill: false,
			  lineTension: 0.1,
			  backgroundColor: 'rgba(75,192,192,0.4)',
			  borderColor: '#FFCE56',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: '#FFCE56',
			  pointBackgroundColor: '#fff',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: '#FFCE56',
			  pointHoverBorderColor: '#FFCE56',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: []
		  },
		  {
			  label: 'Repetition',
			  fill: false,
			  lineTension: 0.1,
			  backgroundColor: 'rgba(75,192,192,0.4)',
			  borderColor: '#E7E9ED',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: '#E7E9ED',
			  pointBackgroundColor: '#fff',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: '#E7E9ED',
			  pointHoverBorderColor: '#E7E9ED',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: []
		  },
		  {
			  label: 'Tone',
			  fill: false,
			  lineTension: 0.1,
			  backgroundColor: 'rgba(75,192,192,0.4)',
			  borderColor: '#36A2EB',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: '#36A2EB',
			  pointBackgroundColor: '#fff',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: '#36A2EB',
			  pointHoverBorderColor: '#36A2EB',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: []
			},
		]
	  };

	let attemptNum = 1;

	props.data.errors_by_attempt.forEach(x =>{
		graphData.labels.push("Attempt #" + attemptNum.toString());
		
		graphData.datasets[0].data.push(x.Tempo);
		graphData.datasets[1].data.push(x.Grammar);
		graphData.datasets[2].data.push(x.Filler);
		graphData.datasets[3].data.push(x.Other);
		graphData.datasets[4].data.push(x.Tone);

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