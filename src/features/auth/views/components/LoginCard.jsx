import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles, Typography, Button, Paper } from '@material-ui/core';
import { authActions } from 'src/features/auth/redux';
import baseStyles from 'src/shared/constants/baseStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.grayReddish,
    borderRadius: 20,
    height: '70%',
    width: '65%',
    textAlign: 'center',
    padding: 10
  },
  buttons: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    width: '50%',
    height: 100,
    backgroundColor: theme.palette.primary.salmon,
    color: '#FFF',
    fontSize: 22,
    fontWeight: 600,
    borderRadius: 20,
    margin: 15,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
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

const LoginCard = ({ isAuthenticated, loginWithRedirect, logout }) => {  
  const dispatch = useDispatch();
  const classes = useStyles();
  const baseClasses = baseStyles();
  
  const handleLogout = () => {
    dispatch(authActions.cleanAuth());
    logout();
  };

  return (    
    <Paper elevation={5} className={classes.paper}>

      <Typography className={baseClasses.title} style={{ marginTop: 25 }}>
        Faça seu login
      </Typography>

      <div className={classes.buttons}>           
        <Button id="loginBtn" onClick={loginWithRedirect} className={classes.btn}>
          Login
        </Button>

        <Button id="signUpBtn" onClick={loginWithRedirect} className={classes.btn}>
          Cadastrar
        </Button>              

        {isAuthenticated && 
          <Button
            id="logoutBtn"
            onClick={handleLogout}
            className={clsx(classes.btn, classes.logoutBtn)}
          >
            Logout
          </Button>      
        }
      </div>
    </Paper>      
  );
};

LoginCard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginWithRedirect: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginCard;