import { createAction } from '@reduxjs/toolkit';

export const cleanSecrets = createAction('secrets/CLEAN_SECRETS');
export const cleanCreateNewSecret = createAction('secrets/CLEAN_CREATE_NEW_SECRET');
export const cleanErrors = createAction('secrets/CLEAN_ERRORS');