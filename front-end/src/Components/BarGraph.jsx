import React from 'react';
import {
	XYPlot,
	XAxis, // Shows the values on x axis
	YAxis, // Shows the values on y axis
	VerticalBarSeries,
	LabelSeries
} from 'react-vis';

export default function BarGraph(props) {
	const data = props.data;
	const chartWidth = 280;
	const chartHeight = 300;
	const chartDomain = [0, 25];

	return (
			<XYPlot 
				margin={40, 0, 0, 70} 
				xType="ordinal"
				width={chartWidth}
				height={chartHeight}
				yDomain={chartDomain}>
				<XAxis tickLabelAngle={-45} />
				<YAxis />
				<VerticalBarSeries data={data}/>
				<LabelSeries
					data={data.map(obj => {
						return { ...obj, label: obj.y.toString() }
					})}
					labelAnchorX="middle"
				/>
			</XYPlot>
	);
}