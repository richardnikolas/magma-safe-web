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
)