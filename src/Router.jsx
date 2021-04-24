import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'src/shared/constants';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import LoginPage from 'src/features/auth/views/LoginPage';
import HomePage from 'src/features/home/views/HomePage';
import ProfilePage from 'src/features/home/views/ProfilePage';
import { MagmaAppBar } from 'src/features/home/views/components';

const Router = () => {
  const dbUser = useSelector(authSelectors.getUser);

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
              <Route exact path={routes.profile.path} component={ProfilePage} />
              <Route render={() => <Redirect path="*" to={routes.login.path} />} />
            </Switch>
          </>
        </Route>
      </Switch>      
    </>
  );
};

export default Router;