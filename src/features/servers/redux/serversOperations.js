import { createAsyncThunk } from '@reduxjs/toolkit';
import { loaderActions } from 'src/features/loader/redux';
import serversManager from '../serversManager';

export const getServersByUserId = createAsyncThunk(
  'servers/GET_SERVERS_BY_USER',
  async ({ userId }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await serversManager.getServersByUserId({ userId });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const createNewServer = createAsyncThunk(
  'servers/CREATE_NEW_SERVER',
  async({ adminId, serverName }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await serversManager.createNewServer({ adminId, serverName });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);
