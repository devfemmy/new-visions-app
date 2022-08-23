import { createSlice } from "@reduxjs/toolkit";
import { getHomePage } from "../action";


const initialState = {
  homeData: null,
};

const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getHomePage.fulfilled]: (state, { payload }) => {
      state.homeData = payload.data;
    }
  },
});

const { reducer } = homePageSlice;

export default reducer;