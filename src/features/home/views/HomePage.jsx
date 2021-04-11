import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { routes } from 'src/shared/constants';
import { MagmaAppBar } from './components';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.darkRedBrown,
    minHeight: '100%',
    alignItems: 'center',
    paddingBottom: 50
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
  const dbUser = useSelector(authSelectors.getUser);
  const isUserLoggintOut = useSelector(authSelectors.getIsUserLoggintOut);
  const { push } = useHistory();
  
  useEffect(() => {   
    if(isUserLoggintOut)
      push(routes.login.path);
  }, [isUserLoggintOut]);

  return (
    <>
      <MagmaAppBar dbUser={dbUser} />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            MagmaSafe
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;