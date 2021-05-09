import { createReducer } from '@reduxjs/toolkit';
import { fetchStatus } from 'src/shared/constants';
import * as serversActions from './serversActions';
import * as serversOperations from './serversOperations';

export const INITIAL_STATE = {
  userServers: {
    fetchStatus: fetchStatus.notFetched
  },
  createNewServer: {
    fetchStatus: fetchStatus.notFetched
  },
  error: false
};

const serversReducer = createReducer(INITIAL_STATE, {
  [serversActions.cleanServers]: () => INITIAL_STATE,
  [serversActions.cleanCreateNewServer]: (state) => ({
    ...state,
    createNewServer: INITIAL_STATE.createNewServer
  }),
  // #region getServersByUser
  [serversOperations.getServersByUserId.fulfilled]: (state, action) => {
    state.userServers = {
      response: [ ...action.payload ],
      fetchStatus: fetchStatus.fulfilled
    };
  },
  [serversOperations.getServersByUserId.pending]: (state) => {
    state.userServers = {
      ...state.userServers,
      fetchStatus: fetchStatus.pending
    }
  },
  [serversOperations.getServersByUserId.rejected]: (state, action) => {
    state.error = true;
    state.userServers = {
      fetchStatus: fetchStatus.rejected,
      error: {
        ...action.payload.response.data[0],
        status: action.payload.response.status
      }
    }
  },
  // #endregion

  // #region createNewServer
  [serversOperations.createNewServer.fulfilled]: (state, action) => {
    state.createNewServer = {
      newServerId: action.payload,
      fetchStatus: fetchStatus.fulfilled
    }
  },
  [serversOperations.createNewServer.rejected]: (state, action) => {
    state.error = true;
    state.createNewServer = {
      fetchStatus: fetchStatus.rejected,
      error: {
        ...action.payload.response.data[0],
        status: action.payload.response.status
      }
    }
  }
  // #endregion
});

export default serversReducer;
