import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { routes, fetchStatus } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import LoginPage from 'src/features/auth/views/LoginPage';
import HomePage from 'src/features/home/views/HomePage';
import ErrorPage from 'src/features/home/views/ErrorPage';
import ProfilePage from 'src/features/home/views/ProfilePage';
import ServersPage from 'src/features/servers/views/ServersPage';
import ServerDetails from 'src/features/servers/views/ServerDetails';
import SecretsPage from 'src/features/secrets/views/SecretsPage';
import { MagmaAppBar } from 'src/features/home/views/components';

const Router = () => {
  const { push } = useHistory();
  const dbUser = useSelector(authSelectors.getUser);  

  setTimeout(() => {
    if (dbUser.isUserLoggintOut || dbUser.fetchStatus === fetchStatus.notFetched)
      push(routes.login.path);
  }, [6660]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path={routes.login.path} component={LoginPage} />
        <Route path="*">
          <>
            <MagmaAppBar dbUser={dbUser} />
            <Switch>            
              <Route exact path={routes.home.path} component={HomePage} />
              <Route exact path={routes.error.path} component={ErrorPage} />
              <Route exact path={routes.profile.path} component={ProfilePage} />

              <Route exact path={routes.servers.path} component={ServersPage} />
              <Route 
                exact 
                path={`${routes.servers.path}/${routes.servers.param}`} 
                component={ServerDetails} 
              />

              <Route exact path={routes.secrets.path} component={SecretsPage} />
              
              <Route render={() => <Redirect path="*" to={routes.login.path} />} />
            </Switch>
          </>
        </Route>
      </Switch>      
    </>
  );
};

export default Router;