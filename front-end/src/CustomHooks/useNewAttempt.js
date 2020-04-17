import React from 'react'

export const useNewAttempt = () => {
	const options = ['Record New Attempt', 'Upload New Attempt'];
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