import { createSlice } from "@reduxjs/toolkit";
import { getSubjectGroups} from "../action";


const initialState = {
  subjectGroupData: null,
};

const subjectGroupData = createSlice({
  name: "subjectGroupDataSlice",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getSubjectGroups.fulfilled]: (state, { payload }) => {
      state.subjectGroupData = payload.data;
    },

  },
});

const { reducer } = subjectGroupData;


export default reducer;