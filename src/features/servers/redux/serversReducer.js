/* eslint-disable sonarjs/no-duplicate-string */
import { createReducer } from '@reduxjs/toolkit';
import { fetchStatus } from 'src/shared/constants';
import * as serversActions from './serversActions';
import * as serversOperations from './serversOperations';

export const INITIAL_STATE = {
  server: {
    fetchStatus: fetchStatus.notFetched  
  },
  userServers: {
    fetchStatus: fetchStatus.notFetched
  },
  createNewServer: {
    fetchStatus: fetchStatus.notFetched
  },
  addUserToServer: {
    fetchStatus: fetchStatus.notFetched
  },
  error: false
};

const serversReducer = createReducer(INITIAL_STATE, {
  [serversActions.cleanServers]: () => INITIAL_STATE,
  [serversActions.cleanCreateNewServer]: (state) => {
    state.createNewServer = INITIAL_STATE.createNewServer
  },
  [serversActions.cleanErrors]: (state) => {
    state.error = false
  },
  [serversActions.cleanAddUserToServer]: (state) => {
    state.addUserToServer = INITIAL_STATE.addUserToServer
  },
  [serversActions.setServer]: (state, action) => {
    state.server = {
      ...action.payload,
      fetchStatus: fetchStatus.fulfilled
    };
  },
  // #region getServersById
  [serversOperations.getServerById.fulfilled]: (state, action) => {
    state.server = {
      ...action.payload,
      fetchStatus: fetchStatus.fulfilled
    }
  },
  [serversOperations.getServerById.pending]: (state) => {
    state.server = {
      fetchStatus: fetchStatus.pending
    }
  },
  [serversOperations.getServerById.rejected]: (state, action) => {
    state.server = {
      fetchStatus: fetchStatus.rejected,
      error: true
    };

    const { response } = action.payload;

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 404)
      errorMessage = 'Não encontramos nenhum Server com esse Id.';    

    state.error = {
      ...action.payload.response.data[0],
      status: action.payload.response.status,
      errorMessage,
      severity: 'error'
    };
  },
  // #endregion

  // #region getServersByUser
  [serversOperations.getServersByUserId.fulfilled]: (state, action) => {
    state.userServers = {
      response: [ ...action.payload ],
      fetchStatus: fetchStatus.fulfilled
    };
  },
  [serversOperations.getServersByUserId.pending]: (state) => {
    state.userServers = {
      fetchStatus: fetchStatus.pending
    }
  },
  [serversOperations.getServersByUserId.rejected]: (state, action) => {
    state.userServers = {
      fetchStatus: fetchStatus.rejected,
      error: true
    };
    const { response } = action.payload;
    let severity = 'error';

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 404) {
      errorMessage = 'Não encontramos nenhum Server para este usuário.';
      severity = 'info';
    }

    state.error = {
      ...action.payload.response.data[0],
      status: action.payload.response.status,
      errorMessage,
      severity
    };
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
    state.createNewServer = {
      fetchStatus: fetchStatus.rejected,
      error: true
    };

    const { response } = action.payload;

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 401)
      errorMessage = 'Apenas um administrador pode criar um Server.'
    else if (response.status === 500)
      errorMessage = response.data[0].message

    state.error = {
      ...response.data[0],
      status: response.status,
      errorMessage,
      severity: 'error'
    };
  },
  // #endregion

  // #region addUserToServer
  [serversOperations.addUserToServer.fulfilled]: (state) => {
    state.addUserToServer = {
      fetchStatus: fetchStatus.fulfilled
    };
    state.server = {
      ...state.server,
      fetchStatus: fetchStatus.notFetched
    };
    state.userServers = {
      ...state.userServers,
      fetchStatus: fetchStatus.notFetched
    };
  },
  [serversOperations.addUserToServer.pending]: (state) => {
    state.addUserToServer = {
      fetchStatus: fetchStatus.pending
    }
  },
  [serversOperations.addUserToServer.rejected]: (state, action) => {
    state.createNewServer = {
      fetchStatus: fetchStatus.rejected,
      error: true
    };

    const { response } = action.payload;

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 401)
      errorMessage = 'Apenas um administrador pode criar adicionar usuários ao Server.'

    state.error = {
      ...response.data[0],
      status: response.status,
      errorMessage,
      severity: 'error'
    };
  },
  // #endregion

  [serversOperations.updateServerIsFavorite.fulfilled]: (state) => {
    state.server = {
      ...state.server,
      fetchStatus: fetchStatus.notFetched
    };
    state.userServers = {
      ...state.userServers,
      fetchStatus: fetchStatus.notFetched
    };
  },
  [serversOperations.updateServerIsFavorite.rejected]: (state, action) => {
    const { response } = action.payload;

    state.error = {
      ...response.data[0],
      status: response.status,
      errorMessage: 'Não foi possível atualizar o Server.',
      severity: 'error'
    };
  }
});

export default serversReducer;
