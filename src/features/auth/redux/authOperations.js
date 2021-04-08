import { createAsyncThunk } from '@reduxjs/toolkit';
import authManager from '../authManager';

export const getUserByEmail = createAsyncThunk(
  'auth/GET_USER_BY_EMAIL',
  async ({ userEmail }, { rejectWithValue }) => {
    try {
      return await authManager.getUserByEmail({ userEmail });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNewUser = createAsyncThunk(
  'auth/CREATE_NEW_USER',
  async ({ userEmail, userName }, { rejectWithValue }) => {
    try {
      return await authManager.createNewUser({ userEmail, userName });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
