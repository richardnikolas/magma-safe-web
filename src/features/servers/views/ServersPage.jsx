import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Grid } from '@material-ui/core';
import { serversOperations, serversActions } from 'src/features/servers/redux';
import { fetchStatus, routes } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { homeActions } from 'src/features/home/redux';
import baseStyles from 'src/shared/constants/baseStyles';
import { ServersTable } from './components';
import * as serversSelectors from '../redux/serversSelectors';

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

const ServersPage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();

  const dispatch = useDispatch();
  const { push } = useHistory();
  const location = useLocation();
  const user = useSelector(authSelectors.getUser);
  const userServers = useSelector(serversSelectors.getUserServers);
  const createNewServer = useSelector(serversSelectors.getCreateNewServer);
  const serverError = useSelector(serversSelectors.getServerErrors);

  useEffect(() => {
    dispatch(serversActions.cleanServers());
  }, [location]);

  useEffect(() => {
    if (userServers.fetchStatus === fetchStatus.notFetched) 
      dispatch(serversOperations.getServersByUserId({ userId: user?.id }));
  }, [userServers, user]);

  useEffect(() => {
    if (createNewServer.fetchStatus === fetchStatus.fulfilled) {
      batch(() => {
        dispatch(serversOperations.getServersByUserId({ userId: user?.id }));
        dispatch(homeActions.setMagmaSnackbar({ 
          message: 'Server criado com sucesso!',
          severity: 'success'
        }));
      });      
    }
  }, [createNewServer]);

  useEffect(() => {
    if (serverError.status && (serverError.status === 401 || serverError.status === 404)) {
      dispatch(homeActions.setMagmaSnackbar({ 
        message: serverError.errorMessage ?? '',
        severity: serverError.severity
      }));  
    }
    else if (serverError) {
      push(routes.error.path);
      batch(() => {
        dispatch(homeActions.setMagmaSnackbar({ 
          message: serverError.errorMessage,
          severity: serverError.severity
        }));  
        dispatch(serversActions.cleanServers());
      });
    }    
  }, [serverError]);

  return (    
    <Grid container className={baseClasses.pageContainer} justify="center">
      <Grid item xs={11} md={10} className={classes.tableWrapper}>        
        <ServersTable userServers={userServers.response} />
      </Grid>
    </Grid>    
  );  
};

export default ServersPage;