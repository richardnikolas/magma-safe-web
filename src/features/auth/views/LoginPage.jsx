import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { authActions } from 'src/features/auth/redux';
import * as authOperations from 'src/features/auth/redux/authOperations';
import { routes } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { Logo } from 'src/shared/assets/svg';
import baseStyles from 'src/shared/constants/baseStyles';
import { LoginCard } from './components';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'League Spartan',
    display: 'inline-block',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 80,
    textAlign: 'right',
    lineHeight: '85px',
    marginRight: 20
  },
  logo: {
    width: 400
  },
  paper: {
    borderRadius: 20,
    height: '80%',
    width: '65%'
  },
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: theme.palette.primary.salmon,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.salmon,
      border: '1px solid #FFF',
      cursor: 'pointer'
    }
  },
  logoutBtn: {
    backgroundColor: theme.palette.primary.darkRedBrown,
    '&:hover': {
      backgroundColor: theme.palette.primary.darkRedBrown
    }
  }
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const auth0User = useSelector(authSelectors.getAuth0User);
  const classes = useStyles();
  const baseClasses = baseStyles();

  useEffect(() => {
    // if (isAuthenticated && auth0User)
    //   push(routes.home.path);
    if (isAuthenticated && user) 
      batch(() => {
        dispatch(authActions.setIsUserAuthenticated(true));
        dispatch(authActions.setAuth0User(user));
        dispatch(authOperations.getUserByEmail({ userEmail: user.email}));
      });
  }, [user, isAuthenticated, auth0User]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={7} className={baseClasses.flexTrueCenter}>
        <Typography className={classes.title}>
          Magma <br />Safe
        </Typography>
        <img src={Logo} alt="MagmaSafe Logo" className={classes.logo}/>
      </Grid>

      <Grid item xs={5} className={baseClasses.flexTrueCenter} style={{height: '100%'}}>
        <LoginCard 
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logout={logout}
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;