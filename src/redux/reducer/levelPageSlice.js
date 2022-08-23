import { createSlice } from "@reduxjs/toolkit";
import { getSubjectLevels } from "../action";


const initialState = {
  levelData: null,
};

const levelPageSlice = createSlice({
  name: "levelPageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubjectLevels.fulfilled]: (state, { payload }) => {
      state.levelData = payload.data;
    }
  },
});

const { reducer } = levelPageSlice;

export default reducer;