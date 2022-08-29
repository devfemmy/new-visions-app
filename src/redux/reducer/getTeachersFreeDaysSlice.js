import { createSlice } from "@reduxjs/toolkit";
import { getTeacherFreeDays} from "../action";


const initialState = {
  teachersFreeDaysData: null,
};

const teachersFreeDaysPageSlice = createSlice({
  name: "teachersFreeDaysPageSlice",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getTeacherFreeDays.fulfilled]: (state, { payload }) => {
      state.teachersFreeDaysData = payload.data;
    },

  },
});

const { reducer } = teachersFreeDaysPageSlice;


export default reducer;