import React from 'react'

export const useNewSpeech = () => {
	const options = ['Record New Speech', 'Upload Existing Speech'];
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(options[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = value => {
		setOpen(false);
		setSelectedValue(value);
	};

	return { open, selectedValue, handleClickOpen, handleClose }
}