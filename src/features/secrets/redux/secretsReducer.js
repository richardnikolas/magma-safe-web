/* eslint-disable sonarjs/no-duplicate-string */
import { createReducer } from '@reduxjs/toolkit';
import { fetchStatus } from 'src/shared/constants';
import * as secretsActions from './secretsActions';
import * as secretsOperations from './secretsOperations';

export const INITIAL_STATE = {
  userSecrets: {
    fetchStatus: fetchStatus.notFetched
  },
  serverSecrets: {
    fetchStatus: fetchStatus.notFetched
  },
  createNewSecret: {
    fetchStatus: fetchStatus.notFetched
  },
  error: false
};

const secretsReducer = createReducer(INITIAL_STATE, {
  [secretsActions.cleanSecrets]: () => INITIAL_STATE,
  [secretsActions.cleanCreateNewSecret]: (state) => {    
    state.createNewSecret = INITIAL_STATE.createNewSecret
  },
  [secretsActions.cleanErrors]: (state) => {
    state.error = false
  },
  // #region getSecretsByUserId
  [secretsOperations.getSecretsByUserId.fulfilled]: (state, action) => {
    state.userSecrets = {
      response: [ ...action.payload ],
      fetchStatus: fetchStatus.fulfilled
    }
  },
  [secretsOperations.getSecretsByUserId.pending]: (state) => {
    state.userSecrets = {
      fetchStatus: fetchStatus.pending
    }
  },
  [secretsOperations.getSecretsByUserId.rejected]: (state, action) => {
    state.error = true;
    state.userSecrets = {
      fetchStatus: fetchStatus.rejected,
      error: {
        ...action.payload.response.data[0],
        status: action.payload.response.status
      }
    }
    const { response } = action.payload;
    let severity = 'error';

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 404) {
      errorMessage = 'Nenhum Secret encontrado';
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

  // #region getSecretsByServerId
  [secretsOperations.getSecretsByServerId.fulfilled]: (state, action) => {
    state.serverSecrets = {
      response: [ ...action.payload ],
      fetchStatus: fetchStatus.fulfilled
    }
  },
  [secretsOperations.getSecretsByServerId.pending]: (state) => {
    state.serverSecrets = {
      fetchStatus: fetchStatus.pending
    }
  },
  [secretsOperations.getSecretsByServerId.rejected]: (state, action) => {
    state.error = true;
    state.serverSecrets = {
      fetchStatus: fetchStatus.rejected,
      error: {
        ...action.payload.response.data[0],
        status: action.payload.response.status
      }
    }
    const { response } = action.payload;
    let severity = 'error';

    let errorMessage = 'Ocorreu algum erro inesperado';

    if (response.status === 404) {
      errorMessage = 'Nenhum Secret encontrado para esse Server';
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

  // #region createNewSecret
  [secretsOperations.createNewSecret.fulfilled]: (state, action) => {
    state.createNewSecret = {
      newSecretId: action.payload,
      fetchStatus: fetchStatus.fulfilled
    };
    state.serverSecrets = {
      ...state.serverSecrets,
      fetchStatus: fetchStatus.notFetched
    };
  },
  [secretsOperations.createNewSecret.rejected]: (state, action) => {
    state.createNewSecret = {
      fetchStatus: fetchStatus.rejected,
      error: true
    };

    const { response } = action.payload;

    state.error = {
      ...response.data[0],
      status: response.status,
      errorMessage: response.data[0].message ?? 'Ocorreu algum erro inesperado',
      severity: 'error'
    };
  },
  // #endregion

  // #region updateSecret
  [secretsOperations.updateLastAccessedByUser.fulfilled]: (state) => {
    state.serverSecrets = {
      ...state.serverSecrets,
      fetchStatus: fetchStatus.notFetched
    }
  },
  [secretsOperations.updateLastAccessedByUser.rejected]: (state, action) => {
    const { response } = action.payload;

    state.error = {
      ...response.data[0],
      status: response.status,
      errorMessage: 'Não foi possível atualizar o Secret.',
      severity: 'error'
    };
  }
  // #endregion
});

export default secretsReducer;
