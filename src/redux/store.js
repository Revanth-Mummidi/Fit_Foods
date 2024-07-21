//const {configureStore} = require('@reduxjs/toolkit');
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AuthSlice from '../Screens/AuthScreen/redux/AuthSlice';
import AllergiesSlice from '../Screens/AllergiesScreen/redux/AllergiesSlice';
import HealthIssuesSlice from '../Screens/HealthIssuesScreen/redux/HealthIssuesSlice';
import FoodSlice from '../Screens/FoodITemScreen/redux/FoodSlice';

// import AuthSlice from '../Screens/AuthScreen/redux/AuthSlice';


const rootreducer = combineReducers({
   'authslice':AuthSlice,
   'allergyslice':AllergiesSlice,
   'healthissueslice':HealthIssuesSlice,
   'foodslice':FoodSlice,
});

export const store = configureStore({
  reducer: rootreducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable state check
    }),
});

export default store;
