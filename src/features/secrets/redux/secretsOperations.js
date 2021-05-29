import { createAsyncThunk } from '@reduxjs/toolkit';
import { loaderActions } from 'src/features/loader/redux';
import secretsManager from '../secretsManager';

export const getSecretsByUserId = createAsyncThunk(
  'secrets/GET_SECRETS_BY_USER_ID',
  async ({ userId }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await secretsManager.getSecretsByUserId({ userId });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const getSecretsByServerId = createAsyncThunk(
  'secrets/GET_SECRETS_BY_SERVER_ID',
  async ({ serverId }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await secretsManager.getSecretsByServerId({ serverId });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const createNewSecret = createAsyncThunk(
  'secrets/CREATE_NEW_SECRET',
  async ({ secretName, magmaSecret, serverId, userId }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await secretsManager.createNewSecret({ secretName, magmaSecret, serverId, userId });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const updateLastAccessedByUser = createAsyncThunk(
  'secrets/UPDATE_LAST_ACCESSED_BY_USER',
  async ({ secretId, userId }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await secretsManager.updateLastAccessedByUser({ secretId, userId });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);