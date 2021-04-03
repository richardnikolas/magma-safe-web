import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { routes } from 'src/shared/constants';

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
    textAlign: 'center',
    fontFamily: 'League Spartan'
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const auth0User = useSelector(authSelectors.getAuth0User);
  const { push } = useHistory();

  // if(!auth0User)
  //   push(routes.login.path);

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

export default HomePage;