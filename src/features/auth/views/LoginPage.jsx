import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { authActions } from 'src/features/auth/redux';
import * as authOperations from 'src/features/auth/redux/authOperations';
import { routes, fetchStatus } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { Logo } from 'src/shared/assets/svg';
import baseStyles from 'src/shared/constants/baseStyles';
import { LoginCard, SignUpCard } from './components';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    minHeight: '100%',
    alignItems: 'center',
    paddingBottom: 50
  },
  title: {
    fontFamily: 'Changa',
    display: 'flex',
    color: '#FFFFFF',
    fontWeight: 700,  
    fontSize: 95,
    textAlign: 'right',
    lineHeight: '85px',
    marginRight: 20,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: 25,
      fontSize: 60,
      lineHeight: '63px',
      justifyContent: 'center'
    }
  },
  logoWrapper: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  logo: {
    width: '50vh',
    [theme.breakpoints.down('xs')]: {
      width: '25vh'
    }
  },
  cardsWrapper: {
    backgroundColor: theme.palette.primary.main
  }
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const auth0User = useSelector(authSelectors.getAuth0User);
  const dbUser = useSelector(authSelectors.getUser);
  const isUserLoggintOut = useSelector(authSelectors.getIsUserLoggintOut);
  const classes = useStyles();
  const baseClasses = baseStyles();

  useEffect(async () => {
    if (isAuthenticated && user) 
      await batch(() => {
        dispatch(authActions.setIsUserAuthenticated(true));
        dispatch(authActions.setAuth0User(user));
        dispatch(authOperations.getUserByEmail({ userEmail: user.email }));
      });
  }, [user, isAuthenticated, auth0User]);

  useEffect(() => {
    if (dbUser.fetchStatus === fetchStatus.fulfilled) 
      push(routes.home.path);
  }, [dbUser]);

  if (isUserLoggintOut)
    dispatch(authActions.setUserLoggintOut(false));

  const isUserAlreadyRegistered = () => (
    !!(auth0User && dbUser.fetchStatus === fetchStatus.rejected)
  );

  return (
    <Grid container className={classes.container}>
      <Grid item md={7} xs={12} style={{ height: '100%' }}>
        <Grid container className={baseClasses.flexTrueCenter}>
          <Grid item md={6} xs={12}>
            <Typography className={classes.title}>
              Magma <br />Safe
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} className={classes.logoWrapper}>
            <img src={Logo} alt="MagmaSafe Logo" className={classes.logo}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={5} xs={12} className={clsx(baseClasses.flexTrueCenter, classes.cardsWrapper)} style={{height: '100%'}}>
        {isUserAlreadyRegistered() 
          ? 
          <SignUpCard auth0User={auth0User} />
          : 
          <LoginCard 
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
        }        
      </Grid>
    </Grid>
  );
};

export default LoginPage;