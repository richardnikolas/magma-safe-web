import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, Grid } from '@material-ui/core';
import { fetchStatus, routes } from 'src/shared/constants';
import { homeActions } from 'src/features/home/redux';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { setServer, cleanServers } from 'src/features/servers/redux/serversActions';
import { 
  getServer, getUserServers, getAddUserToServer, getServerErrors 
} from 'src/features/servers/redux/serversSelectors';
import { getServersByUserId } from 'src/features/servers/redux/serversOperations';
import { cleanSecrets } from 'src/features/secrets/redux/secretsActions';
import { getServerSecrets, getCreateNewSecret, getSecretsErrors } from 'src/features/secrets/redux/secretsSelectors';
import { getSecretsByServerId } from 'src/features/secrets/redux/secretsOperations';
import baseStyles from 'src/shared/constants/baseStyles';
import { ServerCard, SecretsCard } from './components';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'start'
  },
  serverCard: {
    marginTop: '6vh'
  }
}));

const ServerDetails = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { serverId } = useParams();
  const location = useLocation();
  
  const user = useSelector(authSelectors.getUser);
  let server = useSelector(getServer);
  const serverErrors = useSelector(getServerErrors);
  const secretErrors = useSelector(getSecretsErrors);
  const userServers = useSelector(getUserServers);
  const serverSecrets = useSelector(getServerSecrets);
  const createNewSecret = useSelector(getCreateNewSecret);
  const addUserToServer = useSelector(getAddUserToServer);

  useEffect(() => {
    dispatch(cleanSecrets());
  }, [location]);

  useEffect(() => {
    if (serverErrors || secretErrors) {
      const message = serverErrors ? serverErrors.errorMessage : secretErrors.errorMessage;
      const severity = serverErrors ? serverErrors.severity : secretErrors.severity;

      push(routes.error.path);

      batch(() => {
        dispatch(homeActions.setMagmaSnackbar({ 
          message,
          severity
        }));
        dispatch(cleanServers());   
      });      
    }
  }, [serverErrors, secretErrors]);

  useEffect(() => {
    if (serverSecrets.fetchStatus === fetchStatus.notFetched)
      dispatch(getSecretsByServerId({ serverId }));
  }, [serverSecrets]);

  useEffect(() => {
    if (createNewSecret.fetchStatus === fetchStatus.fulfilled)
      dispatch(getSecretsByServerId({ serverId }));
  }, [createNewSecret.fetchStatus]);

  useEffect(() => {
    if (addUserToServer.fetchStatus === fetchStatus.fulfilled)
      dispatch(getServersByUserId({ userId: user?.id }));
  }, [addUserToServer.fetchStatus]);

  useEffect(() => {
    if (userServers.fetchStatus === fetchStatus.notFetched)
      dispatch(getServersByUserId({ userId: user?.id }));

    else if (userServers.fetchStatus === fetchStatus.fulfilled && server.fetchStatus === fetchStatus.notFetched) {
      server = userServers.response.find(s => s.server.id === serverId);
      dispatch(setServer(server));
    }
  }, [serverId, userServers, server]);

  return (
    <div className={baseClasses.pageContainer}>
      <Grid container justify="center" className={clsx(classes.container)}>
        <Grid item xs={10} className={classes.serverCard}>
          <ServerCard server={server} user={user} />
        </Grid>

        <Grid item xs={10} style={{ marginTop: '5vh' }}>
          <SecretsCard server={server} serverSecrets={serverSecrets.response} user={user} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ServerDetails;