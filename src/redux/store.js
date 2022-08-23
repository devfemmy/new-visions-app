import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './reducer/homePageSlices';
import subjectPageReducer from './reducer/subjectPageSlices';
import levelPageReducer from './reducer/levelPageSlice';
import subjectDetailsReducer from './reducer/subjectDetailSlice';
import subReducer from './reducer/subjectSlice';
import teachersReducer from './reducer/teachersSlice';
import appReducer from './reducer/appSlice';

const store = configureStore({
  reducer: {
   homePage: homePageReducer,
   subjectPage: subjectPageReducer,
   levelPage: levelPageReducer,
   subPage: subReducer,
   subjectDetailsPage: subjectDetailsReducer,
   teachersPage: teachersReducer,
   app: appReducer
  },
})

export default store