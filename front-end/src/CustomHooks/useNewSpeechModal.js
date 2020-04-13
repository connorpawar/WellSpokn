import React from 'react'

export const useNewSpeechModal = (onClose, selectedValue) => {
	const [record, setRecord] = React.useState(false);
	const [upload, setUpload] = React.useState(false);

	const handleClose = () => {
		onClose(selectedValue);
		setRecord(false);
		setUpload(false);
	};

	const handleListItemClick = value => {
		if (value === 'Record New Speech' || value === 'Record New Attempt') {
			setRecord(true);
			setUpload(false);
		} else {
			setUpload(true);
			setRecord(false);
		}
	};

	return { record, upload, handleClose, handleListItemClick }
}