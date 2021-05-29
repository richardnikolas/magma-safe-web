import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Grid } from '@material-ui/core';
import { fetchStatus, routes } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { homeActions } from 'src/features/home/redux';
import baseStyles from 'src/shared/constants/baseStyles';
import { secretsActions, secretsOperations } from '../redux';
import { SecretsTable } from './components';
import * as secretsSelectors from '../redux/secretsSelectors';

const useStyles = makeStyles(() => ({
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 130,
    textAlign: 'center',
    fontFamily: 'Changa'
  },
  tableWrapper: {
    margin: '40px 30px'
  }
}));

const SecretsPage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();

  const dispatch = useDispatch();
  const { push } = useHistory();
  const location = useLocation();
  const user = useSelector(authSelectors.getUser);
  const userSecrets = useSelector(secretsSelectors.getUserSecrets);
  const secretsError = useSelector(secretsSelectors.getSecretsErrors);

  useEffect(() => {
    dispatch(secretsActions.cleanSecrets());
  }, [location]);

  useEffect(() => {
    if (userSecrets.fetchStatus === fetchStatus.notFetched)
      dispatch(secretsOperations.getSecretsByUserId({ userId: user?.id }));
  }, [userSecrets, user]);

  useEffect(() => {
    if (secretsError.status && secretsError.status === 404) {
      dispatch(homeActions.setMagmaSnackbar({ 
        message: secretsError.errorMessage ?? '',
        severity: secretsError.severity
      }));
    }
    else if (secretsError) {
      push(routes.error.path);
      dispatch(secretsActions.cleanSecrets());
    }    
  }, [secretsError]);

  return (
    <Grid container justify="center" className={baseClasses.pageContainer}>
      <Grid item xs={11} md={10} className={classes.tableWrapper}>
        <SecretsTable userSecrets={userSecrets.response} />
      </Grid>
    </Grid>
  );
};

export default SecretsPage;