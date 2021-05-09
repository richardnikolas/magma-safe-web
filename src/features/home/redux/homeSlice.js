import { createSlice } from '@reduxjs/toolkit';

export const homeSelectors = {
  getIsDrawerOpen: ({ home }) => home.isDrawerOpen
};

const INITIAL_STATE = {
  isDrawerOpen: false
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
    }
  }
});

export default homeSlice;