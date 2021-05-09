import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer } from 'src/features/auth/redux';
import { loaderReducer } from 'src/features/loader/redux';
import { homeReducer } from 'src/features/home/redux';
import { serversReducer } from 'src/features/servers/redux';

export default (history) => 
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    loader: loaderReducer,
    home: homeReducer,
    servers: serversReducer
  });

