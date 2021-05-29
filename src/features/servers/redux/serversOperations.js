import { createAsyncThunk } from '@reduxjs/toolkit';
import { loaderActions } from 'src/features/loader/redux';
import serversManager from '../serversManager';

export const getServerById = createAsyncThunk(
  'servers/GET_SERVER_BY_ID',
  async ({ serverId, servers }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await serversManager.getServerById({ serverId, servers });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

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
  async ({ adminId, serverName }, { dispatch, rejectWithValue }) => {
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

export const addUserToServer = createAsyncThunk(
  'servers/ADD_USER_TO_SERVER',
  async ({ serverId, userEmail }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await serversManager.addUserToServer({ serverId, userEmail });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
);

export const updateServerIsFavorite = createAsyncThunk(
  'servers/UPDATE_IS_FAVORITE',
  async ({ serverId, userId, isFavorite }, { dispatch, rejectWithValue }) => {
    dispatch(loaderActions.start());
    try {
      return await serversManager.updateServerIsFavorite({ serverId, userId, isFavorite });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(loaderActions.stop());
    }
  }
)
