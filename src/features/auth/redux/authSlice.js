import { createSlice } from '@reduxjs/toolkit';
import { fetchStatus } from 'src/shared/constants';
import * as authOperations from './authOperations';

export const authSelectors = {
  isUserLogged: ({ auth }) => auth.isUserAuthenticated,
  getUser: ({ auth }) => auth.user,
  getAuth0User: ({ auth }) => auth.auth0User
};

export const INITIAL_STATE = {
  isUserAuthenticated: false,
  auth0User: null,
  user: {
    fetchStatus: fetchStatus.notFetched
  },
  error: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    cleanAuth() {
      return INITIAL_STATE;
    },
    setIsUserAuthenticated: (state, action) => {
      state.isUserAuthenticated = action.payload
    },
    setAuth0User: (state, action) => {
      state.auth0User = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    /* getUserByEmail */
    [authOperations.getUserByEmail.fulfilled]: (state, action) => {
      console.log('fulfilled', action.payload);
      state.user = {
        ...action.payload,
        fetchStatus: fetchStatus.fulfilled
      };
    },
    [authOperations.getUserByEmail.pending]: (state) => {
      state.user = {
        ...state.user,
        fetchStatus: fetchStatus.pending
      }
    },
    [authOperations.getUserByEmail.rejected]: (state, action) => {
      console.log('rejected', action);
      state.user = {
        fetchStatus: fetchStatus.rejected,
        error: {
          ...action.payload.response.data[0],
          status: action.payload.response.status
        }
      };
      state.error = true;
    }
  }
});

export default authSlice;

