import { createSlice } from '@reduxjs/toolkit';

export const authSelectors = {
  isUserLogged: ({ auth }) => auth.isUserAuthenticated,
  getUser: ({ auth }) => auth.user,
  getAuth0User: ({ auth }) => auth.auth0User
};

export const INITIAL_STATE = {
  isUserAuthenticated: false,
  auth0User: null,
  user: null
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
  }
});

export default authSlice;

