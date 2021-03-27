import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';

const history = createBrowserHistory();

export default function configureAppStore() {
  return configureStore({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history), thunkMiddleware]
  });
};

export { history };