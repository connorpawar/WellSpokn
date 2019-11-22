import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import logo from '../../Images/WellSpoknCropped.png';
import demo1 from '../../Images/demo.png'
import demo2 from '../../Images/demo2.png'
import demo3 from '../../Images/demo3.png'

import connor from '../../Images/Connor.jpg'
import devin from '../../Images/Devin.jpeg'
import ian from '../../Images/Connor.jpg'
import kyle from '../../Images/Connor.jpg'
import sherman from '../../Images/Sherman.jpg'

import { Link as LinkScroll } from "react-scroll";
import Avatar from '@material-ui/core/Avatar';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="">
				WellSpokn
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
		ul: {
			margin: 0,
			padding: 0,
		},
		li: {
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor: theme.palette.grey[200],
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2),
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
	bigAvatar: {
		width: 240,
		height: 240,
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	  },
}));

const tiers = [
	{
		title: 'Free',
		subheader: 'Most Popular',
		price: '0',
		description: [
			'Up to 10 minute speeches',
			'2 GB of storage',],
		buttonText: 'Sign up for free',
		buttonVariant: 'outlined',
	},
	{
		title: 'Premium',
		subheader: 'Most Features',
		price: '4.99',
		description: [
			'Up to 30 minute speeches',
			'10 GB of storage',],
		buttonText: 'Get started',
		buttonVariant: 'contained',
	},
];
const footers = [
	{
		title: 'Company',
		description: ['Team', 'Contact us', 'Locations'],
	},
	{
		title: 'Features',
		description: ['Feature 1', 'Feature 2', 'Feature 3'],
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use'],
	},
];

export default function LandingPage() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						<img className={classes.cardPricing} src={logo} alt="Company Logo" height="70"></img>
					</Typography>
					<nav>
						<LinkScroll
							activeClass="active"
							to="features"
							spy={true}
							smooth={true}
							offset={-70}
							duration={500}
						>
							<Link variant="button" color="textPrimary" href="#" className={classes.link}>
								Features
            				</Link>
						</LinkScroll>
						<LinkScroll
							activeClass="active"
							to="pricing"
							spy={true}
							smooth={true}
							offset={-70}
							duration={500}
						>
							<Link variant="button" color="textPrimary" href="#" className={classes.link}>
								Pricing
            				</Link>
						</LinkScroll>
						<LinkScroll
							activeClass="active"
							to="team"
							spy={true}
							smooth={true}
							offset={-70}
							duration={500}
						>
							<Link variant="button" color="textPrimary" href="#" className={classes.link}>
								Team
            				</Link>
						</LinkScroll>
					</nav>
					<Button href="#" color="primary" variant="outlined" className={classes.link}>
						Login
          </Button>
				</Toolbar>
			</AppBar>
			{/* Description */}
			<Container maxWidth="sm" component="main" className={classes.heroContent}>
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					Our Product
        </Typography>
				<Typography variant="h5" align="center" color="textSecondary" component="p">
					WellSpokn is A web application that allows users to record speeches to locate and correct issues
					within those speeches, such as bad grammar, filler words, repetition, amongst other issues.
        </Typography>
				<br /><br />
			</Container>
			{/* End Description */}
			{/* Pictures for demo purposes*/}
			<Container maxWidth="md">
				<Grid container spacing={5}>
					<Grid item xs={12} sm={6} md={6}>
						<img src={demo1} alt="Product Demo" height="400"></img>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<img src={demo2} alt="Product Demo" height="400"></img>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<img src={demo3} alt="Product Demo" height="400"></img>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<img src={demo1} alt="Product Demo" height="400"></img>
					</Grid>
				</Grid>
			</Container>
			{/* End of pictures for demo purposes*/}
			{/* Pricing */}
			<Container id="pricing" maxWidth="sm" component="main" className={classes.heroContent}>
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					Pricing
        </Typography>
				<Typography variant="h5" align="center" color="textSecondary" component="p">
					Choose what works best for you!
        </Typography>
			</Container>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{tiers.map(tier => (
						// Enterprise card is full width at sm breakpoint
						<Grid item key={tier.title} xs={12} sm={6} md={6}>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									action={tier.title === 'Premium' ? <StarIcon /> : null}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											/mo
                    </Typography>
									</div>
									<ul>
										{tier.description.map(line => (
											<Typography component="li" variant="subtitle1" align="center" key={line}>
												{line}
											</Typography>
										))}
									</ul>
								</CardContent>
								<CardActions>
									<Button fullWidth variant={tier.buttonVariant} color="primary">
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			{/* End Pricing */}
			{/* Team*/}
			<Container id="team" maxWidth="sm" component="main" className={classes.heroContent}>
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					Our Team
        		</Typography>
				<Typography variant="h5" align="center" color="textSecondary" component="p">
					We're a group of 5 students in Dr. Johnson's EECS 581 Senior Design class.
        		</Typography>
				<br /><br />
			</Container>
			<Container maxWidth="md">
				<Grid justify="space-evenly" alignItems="center" container spacing={10}>
					<Grid item xs={12} sm={6} md={6}>
						<Avatar alt="Connor" src={connor} className={classes.bigAvatar} />
						<Typography variant="h5" align="center" color="textSecondary" component="p">
							Connor Pawar
        			</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Avatar alt="Devin" src={devin} className={classes.bigAvatar} />
						<Typography variant="h5" align="center" color="textSecondary" component="p">
							Devin Suttles
        			</Typography>
					</Grid>
				</Grid>
				<Grid justify="space-evenly" alignItems="center" container spacing={10}>
					<Grid item xs={12} sm={4} md={4}>
						<Avatar alt="Ian" src={ian} className={classes.bigAvatar} />
						<Typography variant="h5" align="center" color="textSecondary" component="p">
							Ian Yake
        			</Typography>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Avatar alt="Kyle" src={kyle} className={classes.bigAvatar} />
						<Typography variant="h5" align="center" color="textSecondary" component="p">
							Kyle Lindteigen
        			</Typography>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Avatar alt="Sherman" src={sherman} className={classes.bigAvatar} />
						<Typography variant="h5" align="center" color="textSecondary" component="p">
							Sherman Choi
        			</Typography>
					</Grid>
				</Grid>
			</Container>
			{/* End of Team section*/}
			{/* Footer */}
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={4} justify="space-evenly">
					{footers.map(footer => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map(item => (
									<li key={item}>
										<Link href="#" variant="subtitle1" color="textSecondary">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
			{/* End footer */}
		</React.Fragment>
	);
}