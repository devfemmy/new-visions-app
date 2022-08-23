import { createSlice } from "@reduxjs/toolkit";
import { getSubjectStages } from "../action";


const initialState = {
  subjectData: null,
};

const subjectPageSlice = createSlice({
  name: "subjectPageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubjectStages.fulfilled]: (state, { payload }) => {
      state.subjectData = payload.data;
    }
  },
});

const { reducer } = subjectPageSlice;

export default reducer;