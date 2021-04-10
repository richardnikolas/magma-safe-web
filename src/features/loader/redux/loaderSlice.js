import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: false
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState: INITIAL_STATE,
  reducers: {
    start(state) {
      state.isLoading = true;
    },
    stop(state) {
      state.isLoading = false;
    }
  }
});

export default loaderSlice;