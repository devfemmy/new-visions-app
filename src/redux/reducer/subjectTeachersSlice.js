import { createSlice } from "@reduxjs/toolkit";
import { getSubjectTeachers} from "../action";


const initialState = {
  subjectTeachersData: null,
};

const subjectTeachersSlice = createSlice({
  name: "subjectTeachersSlice",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getSubjectTeachers.fulfilled]: (state, { payload }) => {
      state.subjectTeachersData = payload.data;
    },

  },
});

const { reducer } = subjectTeachersSlice;


export default reducer;