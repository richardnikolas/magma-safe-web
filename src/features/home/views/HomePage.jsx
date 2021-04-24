import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { routes } from 'src/shared/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.darkRedBrown,
    minHeight: '100%',
    alignItems: 'center',
    padding: '70px 0 50px 80px',
    [theme.breakpoints.up('xs')]: {
      padding: '60px 0 50px 0'
    }
  },
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
  const isUserLoggintOut = useSelector(authSelectors.getIsUserLoggintOut);
  const { push } = useHistory();
  
  useEffect(() => {
    if (isUserLoggintOut)
      push(routes.login.path);
  }, [isUserLoggintOut]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          MagmaSafe
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;