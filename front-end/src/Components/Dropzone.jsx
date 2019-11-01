import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	Dropzone: {
		height: '200px',
		width: '200px',
		backgroundColor: '#fff',
		border: '2px dashed rgb(187, 186, 186)',
		borderRadius: '50%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		fontSize: '16px',
		margin: '10px',
	},
	Icon: {
		opacity: '0.3',
		height: '64px',
		width: '64px',
	},
	FileInput: {
		display: 'none'
	},
	Highlight: {
		height: '200px',
		width: '200px',
		backgroundColor: 'rgb(188, 185, 236)',
		border: '2px dashed rgb(187, 186, 186)',
		borderRadius: '50%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		fontSize: '16px',
		margin: '10px',
	},
	description: {
		padding: '35px'
	}
}));

export default function LoginBanner() {
	const classes = useStyles();

	const upload = React.useRef(null)

	const [highlight, setHighlight] = React.useState(false);
	const [fileDisplay, setFileDisplay] = React.useState(false);
	const [file, setFile] = React.useState(null);

	const handleClick = event => {
		upload.current.click()
	};

	const onFileAdded = event => {
		event.preventDefault();
		const file = event.target.files
		setFile(file);
		setFileDisplay(true);
		console.log(file);
	};

	const onDragOver = event => {
		event.preventDefault();
		setHighlight(true);
	};

	const onDragLeave = event => {
		setHighlight(false);
	};

	const onDrop = event => {
		event.preventDefault();
		const file = event.dataTransfer.files
		setFile(file);
		setFileDisplay(true);
		console.log(file)
	};

	return (
		<Grid container spacing={0}
			direction="row"
			justify="flex-start"
			alignItems="baseline">
			<Grid key={0} item sm={6} xs={"auto"} zeroMinWidth>
				<div className={highlight ? classes.Highlight : classes.Dropzone}
					onClick={handleClick}
					onDragOver={onDragOver}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
				>
					<img
						alt="upload"
						className={classes.Icon}
						src="cloud_upload-24px.svg"
					/>
					<input
						ref={upload}
						className={classes.FileInput}
						type="file"
						multiple
						onChange={onFileAdded}
					/>
					<span>Upload Files</span>
				</div>
			</Grid>
			<Grid key={1} item sm={6} xs={"auto"} zeroMinWidth>
				<div className={classes.description}>
					<p>File Chosen: {fileDisplay ? file[0].name : "N/A"}</p>
				</div>
			</Grid>
		</Grid>
	);
}