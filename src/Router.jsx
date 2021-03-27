import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from 'src/shared/constants';
import Dummy from 'src/features/Dummy';

const Router = () => (
  <Switch>
    <Route exact path={routes.home.path} component={Dummy} />
  </Switch>
);

export default Router;