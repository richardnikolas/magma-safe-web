import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    alignItems: 'center'
  },  
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 80,
    textAlign: 'center'
  }
}));

const CreateUserPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8}>
        <Typography className={classes.title}>
          CreateUserPage
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CreateUserPage;