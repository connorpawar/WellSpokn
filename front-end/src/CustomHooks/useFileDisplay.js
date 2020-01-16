import React from 'react'

export const useFileDisplay = () => {

	const [fileDisplay, setFileDisplay] = React.useState(false);
	const [file, setFile] = React.useState(null);

	const onFileAdded = event => {
		event.preventDefault();
		const file = event.target.files
		setFile(file);
		setFileDisplay(true);
		console.log(file);
	};

	const onDrop = event => {
		event.preventDefault();
		const file = event.dataTransfer.files
		setFile(file);
		setFileDisplay(true);
		console.log(file)
	};

	return { file, fileDisplay, onFileAdded, onDrop }
}