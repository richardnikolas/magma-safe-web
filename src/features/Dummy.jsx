import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dummy: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    alignItems: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 100,
    textAlign: 'center'
  }
}));

const Dummy = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.dummy}>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          MagmaSafe
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Dummy;