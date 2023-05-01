import React from "react";
import { Dimensions } from "react-native";

// Window dimensions
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

// date format
export const DATE_FORMAT = "YYYY/MM/DD";
export const DATE_FORMAT_HEJRI = "iYYYY/iMM/iDD";

// Api URL
export const API_URL_UAT =
"https://newvisions.sa/api/";
export const API_URL_Prod =
  "https://newvisions.sa/api/";

// fetch header
// export const createHeader = (token) => {
//   let headers = new Headers();
//   if (token) headers.append("Authorization", `Bearer ${token}`);
//   return headers;
// };
