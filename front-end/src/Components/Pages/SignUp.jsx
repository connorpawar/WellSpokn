import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouteLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import logo from '../../Images/WellSpoknCropped.png';

import useLogin from '../../CustomHooks/useLogin';
import { loginUser } from '../../actions';
import { useHomePage } from '../../CustomHooks/useHompage'

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				WellSpokn
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const history = useHistory();

	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const { onLogin } = useHomePage(); 

	const [failed, setFailed] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setFailed(false);
	};


	const signupSubmit = () => {
		fetch('api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inputs),
		})
			.then(response => response.json())
			.then((data) => {
				if (data.status == "success") {
					localStorage.setItem("token", data.token);
					dispatch(loginUser(data));

					history.push((onLogin(data.token)));
				} else {
					setFailed(true);
				}
			})
			.catch(error => {setFailed(true); console.log("fetch error", error)});
	}

	const { inputs, handleInputChange, handleSubmit } = useLogin(signupSubmit);

	return (
		<React.Fragment>
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src={logo} alt="Company Logo" height="70"></img>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								onChange={handleInputChange}
								value={inputs.firstName || ''}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								onChange={handleInputChange}
								value={inputs.lastName || ''}
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleInputChange}
								value={inputs.email || ''}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleInputChange}
								value={inputs.password || ''}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
          			</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link component={RouteLink} to="/login" variant="body2">
								Already have an account? Sign in
              				</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
		<Snackbar open={failed} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				Signup Failed! Please try again.
			</Alert>
		</Snackbar>
		</React.Fragment>
	);
}