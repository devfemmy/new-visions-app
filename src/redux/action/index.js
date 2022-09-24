/* eslint-disable import/no-cycle */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setError, stopLoad } from "../reducer/appSlice";

export const handleError = (err, dispatch) => {
  // handle non-server based erorrs
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token')
    } catch(e) {
      // remove error
    }
  
    // console.log('Done.')
  }
  if (err.code === 403) {
    // AsyncStorage.removeItem('token')
    removeValue()
  }
  if (!err.response && !err.data)
    dispatch(
      setError("There seems to be an issue currently, please try again")
    );
  else if (!err.response) dispatch(setError(err.data.message));
  // handle server server based errors
  // else {
  //   let msg =
  //     err.response.data.customMessage ||
  //     err.response.data.message ||
  //     err.response.data;
  //   if (typeof msg === "object")
  //     // msg = msg.reduce((aggr, errObj) => aggr + errObj.msg + ",", "");
  //   dispatch(setError(msg));
  //   dispatch(stopLoad());
  // }
  if (err.response?.data?.statusCode === 401) {
    console.log("Now logging out");
    // localStorage.clear();
  }
  throw err;
};

export {
  getHomePage
} from "./homePageAction";

export {getSubjectStages, getSubjectLevels, getSubject, getSubjectDetails, } from "./subjectPageAction";
export { getTeachers } from "./teachersPageAction";
export { getSubjectTeachers } from "./subjectTeachersAction";
export { getSubjectGroups } from "./subGroupAction";
export { getGroupDays } from "./getGroupDaysAction";
export {getSubjectChaptersAndLessons} from "./subjectLessonsAction";
export {getTeacherFreeDays} from "./getTeachersFreeDaysAction";