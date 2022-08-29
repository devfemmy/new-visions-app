import { createSlice } from "@reduxjs/toolkit";
import { getSubjectChaptersAndLessons} from "../action";


const initialState = {
  getSubjectChaptersAndLessonData: null,
};

const getSubjectChaptersAndLessonsPageSlice = createSlice({
  name: "getSubjectChaptersAndLessonsPageSlice",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getSubjectChaptersAndLessons.fulfilled]: (state, { payload }) => {
      state.getSubjectChaptersAndLessonData = payload.data;
    },

  },
});

const { reducer } = getSubjectChaptersAndLessonsPageSlice;


export default reducer;