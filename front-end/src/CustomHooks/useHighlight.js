import React from 'react'

export const useHighlight = () => {
	const [highlight, setHighlight] = React.useState(false);

	const onDragOver = event => {
		event.preventDefault();
		setHighlight(true);
	};

	const onDragLeave = () => {
		setHighlight(false);
	};

	return { highlight, onDragOver, onDragLeave }
} 