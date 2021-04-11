import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import configureStore, { history } from 'src/store';
import { createTheme } from 'src/shared/theme';
import { ConnectedRouter } from 'connected-react-router/immutable';
import ErrorBoundary from 'src/shared/components/ErrorBoundary.ig';
import LoaderPage from 'src/features/loader/views/LoaderPage';
import { BrowserRouter } from "react-router-dom";
import { SmallFooter } from 'src/shared/components';
import Router from './Router';
import Auth0ProviderWithHistory from './auth0-provider-with-history';

const store = configureStore();

const App = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <BrowserRouter>
              <Auth0ProviderWithHistory>
                <>
                  <LoaderPage />
                  <Router />
                  <SmallFooter />
                </>
              </Auth0ProviderWithHistory>
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App;
