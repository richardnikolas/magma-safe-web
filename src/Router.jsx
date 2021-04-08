import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'src/shared/constants';
import LoginPage from 'src/features/auth/views/LoginPage';
import HomePage from 'src/features/home/views/HomePage';

const Router = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route exact path={routes.login.path} component={LoginPage} />    
    <Route exact path={routes.home.path} component={HomePage} />    
    <Route render={() => <Redirect path="*" to={routes.login.path} />} />
  </Switch>
);

export default Router;