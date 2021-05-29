import { createSlice } from '@reduxjs/toolkit';

export const homeSelectors = {
  getIsDrawerOpen: ({ home }) => home.isDrawerOpen,
  getMagmaSnackbar: ({ home }) => home.magmaSnackbar
};

const INITIAL_STATE = {
  isDrawerOpen: false,
  magmaSnackbar: null
};

const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openDrawer(state) {
      state.isDrawerOpen = true;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false
    },
    setMagmaSnackbar(state, action) {
      const { message, severity } = action.payload;
      state.magmaSnackbar = { 
        message, 
        severity 
      };
    },
    cleanMagmaSnackbar(state) {
      state.magmaSnackbar = null
    }
  }
});

export default homeSlice;