import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    backgroundColor: theme.palette.text.primary
  },
  info: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 12
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10
    }
  }
}));

const SmallFooter = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.info}>
          MagmaSafe © - 2021
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SmallFooter;
