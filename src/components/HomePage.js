import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import ListDividers from './ListDividers';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    cards: {
        height: '89vh'
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '15px'
    },
    p: {
        textIndent: '40px'
    }
  }));

  function createData(id, name, content) {
    return {id, name, content};
  }
  
  const speeches = [
    createData(0, 'Fall of the Roman Empire', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
    createData(1, 'The Civil War', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
    createData(2, 'The Vietnam War', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
    createData(3, 'How The First Clock Was Created', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
    createData(4, 'My Favorite Gingerbread Recipes', 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'),
  ];

export default function HomePage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <Grid container spacing={0}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch">
                <Grid item xs={2}>
                    <ListDividers/>
                </Grid>
                <Grid item xs={10}>
                <div id="cards">
                    <Grid container spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="baseline">
                        {speeches.map(speech => (
                            <Grid key={speech.id} item xs={3}>
                                <Card className={classes.paper}>
                                <b>{speech.name}</b><br/>
                                <p className={classes.p} align="left">{speech.content.substring(0, 255) + '...'}</p>
                                </Card>
                            </Grid>
                        ))}                   
                    </Grid>
                </div>
                </Grid>
            </Grid>
        </div>
    );
}