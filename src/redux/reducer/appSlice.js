import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  loading: false,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoad(state) {
      state.loading = true;
      state.error = null;
    },
    stopLoad(state) {
      state.loading = false;
    },

    setError(state, { payload }) {
      state.error = payload;
    },

    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: {
   
  },
});

const { reducer, actions } = appReducer;

export const { startLoad, stopLoad, setError, clearError } = actions;
export default reducer;