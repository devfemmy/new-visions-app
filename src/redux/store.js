import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './reducer/homePageSlices';
import subjectPageReducer from './reducer/subjectPageSlices';
import levelPageReducer from './reducer/levelPageSlice';
import subjectDetailsReducer from './reducer/subjectDetailSlice';
import subReducer from './reducer/subjectSlice';
import teachersReducer from './reducer/teachersSlice';
import subjectTeacherReducer from './reducer/subjectTeachersSlice';
import subjectGroupReducer from './reducer/subjectGroupSlice';
import groupDaysReducer from './reducer/getGroupDaysSlice';
import teacherFreeDaysReducer from './reducer/getTeachersFreeDaysSlice';
import getSubjectChaptersAndLessonsReducer from './reducer/getSubjectChapterLessonSlice';

import appReducer from './reducer/appSlice';

const store = configureStore({
  reducer: {
   homePage: homePageReducer,
   subjectPage: subjectPageReducer,
   levelPage: levelPageReducer,
   subPage: subReducer,
   subjectDetailsPage: subjectDetailsReducer,
   teachersPage: teachersReducer,
   subjectTeachersPage: subjectTeacherReducer,
   getSubjectChaptersAndLessonsPage: getSubjectChaptersAndLessonsReducer,
   teacherFreeDaysPage: teacherFreeDaysReducer,
   subjectGroupPage: subjectGroupReducer,
   groupDaysPage: groupDaysReducer,
   app: appReducer
  },
})

export default store