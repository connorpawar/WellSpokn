import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useHighlight } from '../../CustomHooks/useHighlight'
import { useFileDisplay } from '../../CustomHooks/useFileDisplay'
import { Button } from '@material-ui/core';
import { useEffect } from 'react';

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

export default function Dropzone(props) {
	const classes = useStyles();

	const upload = React.useRef(null)

	const { highlight, onDragOver, onDragLeave } = useHighlight();
	const { file, fileDisplay, onFileAdded, onDrop, clearFile } = useFileDisplay();

	useEffect(() => {
		
	  },[file]);

	const handleClick = event => {
		upload.current.click()
	};

	const sendToBackEnd = () => {
		var form_data = new FormData();
		form_data.append('title', props.title);
        form_data.append('file',file[0]);
        fetch('api/upload_blob', {
          method : 'POST',
          body: form_data
        }).then(r =>{
          r.text().then(a =>{
            console.log(a)
          })
        })
	}

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
					{fileDisplay? <Button onClick={sendToBackEnd}>Send</Button> : null}
					{fileDisplay? <Button onClick={clearFile}>Clear</Button> : null}
				</div>
			</Grid>
		</Grid>
	);
}