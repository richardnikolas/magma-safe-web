import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Grid } from '@material-ui/core';
import { serversOperations } from 'src/features/servers/redux';
import { fetchStatus } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
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
  const user = useSelector(authSelectors.getUser);
  const userServers = useSelector(serversSelectors.getUserServers);
  const createNewServer = useSelector(serversSelectors.getCreateNewServer);

  useEffect(() => {
    if (userServers.fetchStatus === fetchStatus.notFetched) 
      dispatch(serversOperations.getServersByUserId({ userId: user?.id }));
  }, [userServers, user, createNewServer]);

  useEffect(() => {
    if (createNewServer.fetchStatus === fetchStatus.fulfilled)
      dispatch(serversOperations.getServersByUserId({ userId: user?.id }));
  }, [createNewServer]);

  return (
    <Grid container className={baseClasses.pageContainer} justify="center">
      <Grid item xs={11} md={10} className={classes.tableWrapper}>        
        <ServersTable userServers={userServers.response} />
      </Grid>
    </Grid>
  );
};

export default ServersPage;