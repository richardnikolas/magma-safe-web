import { createAction } from '@reduxjs/toolkit';

export const cleanServers = createAction('servers/CLEAN_SERVERS');
export const cleanCreateNewServer = createAction('servers/CLEAN_CREATE_NEW_SERVERS');