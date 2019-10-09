import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
	card: {
		minWidth: 275,
		margin: 30,
	},
	textField: {
		flexBasis: 200,
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(2),
	},
	buttons: {
		marginTop: theme.spacing(2),
	}
}));
export default function Login(props) {
	const classes = useStyles();
	const [values, setValues] = React.useState({
		username: '',
		password: '',
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<div>
			<div id="cards">
				<Grid container spacing={2}
					direction="row"
					justify="center"
					alignItems="baseline">
					<Grid item sm={4} xs={"auto"}>
						<Card className={classes.card}>
							<CardContent>
								<b>Login</b><br />
								<TextField
									id="outlined-username"
									className={classes.textField}
									variant="outlined"
									fullWidth={true}
									label="Username"
									value={values.username}
									onChange={handleChange('username')}
								/>
								<TextField
									id="outlined-adornment-password"
									className={classes.textField}
									variant="outlined"
									fullWidth={true}
									type={values.showPassword ? 'text' : 'password'}
									label="Password"
									value={values.password}
									onChange={handleChange('password')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													edge="end"
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{values.showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<Grid container spacing={2}
									direction="row"
									justify="center"
									alignItems="baseline">
									<Grid item xm={"auto"}>
										<ButtonGroup color="primary" className={classes.buttons} aria-label="outlined primary button group">
											<Button>Login</Button>
											<Button>Sign Up</Button>
										</ButtonGroup>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
