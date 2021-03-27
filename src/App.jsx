import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import configureStore, { history } from 'src/store';
import { createTheme } from 'src/shared/theme';
import { ConnectedRouter } from 'connected-react-router/immutable';
import ErrorBoundary from 'src/shared/components/ErrorBoundary.ig';
import Router from './Router';

const store = configureStore();

const App = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App;
