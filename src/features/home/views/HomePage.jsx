import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { routes } from 'src/shared/constants';
import baseStyles from 'src/shared/constants/baseStyles';

const useStyles = makeStyles(() => ({
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 130,
    textAlign: 'center',
    fontFamily: 'Changa'
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const isUserLoggintOut = useSelector(authSelectors.getIsUserLoggintOut);
  const { push } = useHistory();
  
  useEffect(() => {
    if (isUserLoggintOut)
      push(routes.login.path);
  }, [isUserLoggintOut]);

  return (
    <Grid container className={baseClasses.pageContainer}>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          MagmaSafe
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;