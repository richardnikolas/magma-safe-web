import { createAction } from '@reduxjs/toolkit';

export const cleanErrors = createAction('servers/CLEAN_ERRORS');
export const cleanServers = createAction('servers/CLEAN_SERVERS');
export const cleanCreateNewServer = createAction('servers/CLEAN_CREATE_NEW_SERVERS');
export const cleanAddUserToServer = createAction('servers/CLEAN_ADD_USER_TO_SERVER');
export const setServer = createAction('servers/SET_SERVER');