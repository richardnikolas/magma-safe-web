import { createAsyncThunk } from '@reduxjs/toolkit';
import { loaderActions } from 'src/features/loader/redux';
import authManager from '../authManager';

export const getUserByEmail = createAsyncThunk(
  'auth/GET_USER_BY_EMAIL',
  async ({ userEmail }, { dispatch,  rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {      
      return await authManager.getUserByEmail({ userEmail });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const createNewUser = createAsyncThunk(
  'auth/CREATE_NEW_USER',
  async ({ userEmail, userName }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {      
      return await authManager.createNewUser({ userEmail, userName });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);
