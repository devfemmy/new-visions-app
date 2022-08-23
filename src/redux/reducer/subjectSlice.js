import { createSlice } from "@reduxjs/toolkit";
import { getSubject } from "../action";


const initialState = {
  subject: null,
};

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubject.fulfilled]: (state, { payload }) => {
      state.subject = payload.data;
    }
  },
});

const { reducer } = subjectSlice;

export default reducer;