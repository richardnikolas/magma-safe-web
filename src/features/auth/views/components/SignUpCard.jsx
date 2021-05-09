import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography, Button, Paper, Grid } from '@material-ui/core';
import { TextInput } from 'src/shared/components';
import * as authOperations from 'src/features/auth/redux/authOperations';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { routes, fetchStatus } from 'src/shared/constants';
import { textInputErrorMessage } from 'src/shared/constants/functions';
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
    padding: '60px 10px',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      marginTop: 50
    }
  },
  btn: {
    width: '100%',
    height: 100,
    backgroundColor: theme.palette.primary.salmon,
    color: '#FFF',
    fontSize: 22,
    fontWeight: 600,
    borderRadius: 20,
    margin: 15,
    textTransform: 'capitalize',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.primary.salmon,
      transform: 'scale(1.05)',
      cursor: 'pointer'
    },
    '&:disabled': {
      backgroundColor: theme.palette.primary.gray,
      border: `1px solid ${theme.palette.primary.salmon}`
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      height: 80
    }
  }
}));

const SignUpCard = ({ auth0User }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const baseClasses = baseStyles();

  const { push } = useHistory();
  const newUser = useSelector(authSelectors.getNewUser);
  const [userName, setUserName] = useState('');

  const handleChangeName = (newValue) => {
    setUserName(newValue);
  };

  const isUserNameValid = (name) => {
    if (name?.length > 2 && name?.length < 25 && name !== auth0User.email)
      return true;
    return false;
  };

  const handleCreateUser = async () => {
    await dispatch(authOperations.createNewUser({ userEmail: auth0User.email, userName }));
    push(routes.home.path);
  };

  useEffect(async () => {
    if (newUser.fetchStatus === fetchStatus.fulfilled) {
      await dispatch(authOperations.getUserByEmail({ userEmail: auth0User.email }));
      push(routes.home.path);
    }
  }, [newUser]);

  return (    
    <Paper elevation={5} className={classes.paper}>
      <Typography className={baseClasses.title}>
        Informações <br /> complementares
      </Typography>

      <div className={clsx(baseClasses.flexColumn, baseClasses.flexEvenly)} style={{ height: '100%' }}>
        <Grid container justify="center" style={{padding: '30px 0'}}>
          <Grid item md={9} xs={10}>
            <TextInput
              label="Nome"
              placeholder="Insira seu nome aqui"
              value={userName}
              onChange={handleChangeName}
              max={25}
              min={2}
              errorMessage={textInputErrorMessage({ input: userName, min: 2, max: 25 })}
              required
              style={{ fontSize: 20 }}
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item md={6} xs={10}>
            <Button 
              id="loginBtn" 
              onClick={handleCreateUser} 
              className={classes.btn}
              disabled={!isUserNameValid(userName)}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>      
  );
};

SignUpCard.propTypes = {
  auth0User: PropTypes.object
};

SignUpCard.defaultProps = {
  auth0User: {}
};

export default SignUpCard;