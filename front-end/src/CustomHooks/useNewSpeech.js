import React from 'react'

export const useNewSpeech = (setReload) => {
	const options = ['Record New Speech', 'Upload Existing Speech'];
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(options[1]);

	const handleClickOpen = () => {
		setOpen(true);
		//setReload(true);
	};

	const handleClose = value => {
		setOpen(false);
		//setReload(true);
		setSelectedValue(value);
	};

	return { open, selectedValue, handleClickOpen, handleClose }
}