import { createSlice } from "@reduxjs/toolkit";
import { getGroupDays} from "../action";


const initialState = {
  getGroupDaysData: null,
};

const getGroupDaysPage = createSlice({
  name: "getGroupDaysPageSlice",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getGroupDays.fulfilled]: (state, { payload }) => {
      state.getGroupDaysData = payload.data;
    },

  },
});

const { reducer } = getGroupDaysPage;


export default reducer;