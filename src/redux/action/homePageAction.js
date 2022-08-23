import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducer/appSlice";
import { handleError } from ".";
import HomePageService from "../../services/userServices";


export const getHomePage = createAsyncThunk(
  "get/homepage",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await HomePageService.homePage()
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