import { createSlice } from "@reduxjs/toolkit";
import { getSubjectDetails } from "../action";


const initialState = {
  subjectDetails: null,
};

const subjectDetailsSlice = createSlice({
  name: "subjectDetailsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubjectDetails.fulfilled]: (state, { payload }) => {
      state.subjectDetails = payload.data;
    }
  },
});

const { reducer } = subjectDetailsSlice;

export default reducer;