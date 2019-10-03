import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: 'rgba(211,211,211,0.5)',
    height: '90vh'
  },
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Speeches" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Progress" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Settings" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Log out" />
      </ListItem>
    </List>
  );
}