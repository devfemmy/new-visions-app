import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import HomePageService from "../../services/userServices";
import { startLoad, stopLoad } from "../reducer/appSlice";


export const getSubjectTeachers = createAsyncThunk(
  "get/getSubjectTeachers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await HomePageService.getSubjectTeachers(data)
      if (res.code === 200) {
        return res;
      }
        handleError(res, dispatch);
      
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);