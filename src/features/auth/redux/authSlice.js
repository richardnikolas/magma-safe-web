import { createSlice } from '@reduxjs/toolkit';
import { fetchStatus } from 'src/shared/constants';
import * as authOperations from './authOperations';

export const authSelectors = {
  isUserLogged: ({ auth }) => auth.isUserAuthenticated,
  getUser: ({ auth }) => auth.user,
  getAuth0User: ({ auth }) => auth.auth0User,
  getNewUser: ({ auth }) => auth.newUser,
  getIsUserLoggintOut: ({ auth }) => auth.user.loggingOut
};

export const INITIAL_STATE = {
  isUserAuthenticated: false,
  auth0User: null,
  user: {
    fetchStatus: fetchStatus.notFetched,
    loggingOut: false
  },
  newUser: {
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
    },
    setUserName: (state, action) => {
      state.auth0User.name = action.payload;
    },
    setUserLoggintOut: (state, action) => {
      state.user.loggingOut = action.payload;
    }
  },
  extraReducers: {
    // #region getUserByEmail
    [authOperations.getUserByEmail.fulfilled]: (state, action) => {
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
      state.error = true;
      state.user = {
        fetchStatus: fetchStatus.rejected,
        error: {
          ...action.payload.response.data[0],
          status: action.payload.response.status
        }
      };      
    },
    // #endregion
    
    // #region  createNewUser
    [authOperations.createNewUser.fulfilled]: (state, action) => {
      state.newUser = {
        id: action.payload,
        fetchStatus: fetchStatus.fulfilled
      };
    },
    [authOperations.createNewUser.pending]: (state) => {
      state.newUser = {
        ...state.newUser,
        fetchStatus: fetchStatus.pending
      };
    },
    [authOperations.createNewUser.rejected]: (state, action) => {
      state.error = true;
      state.newUser = {
        fetchStatus: fetchStatus.rejected,
        error: {
          ...action.payload.response.data[0],
          status: action.payload.response.status
        }
      };
    }
    // #endregion
  }
});

export default authSlice;

