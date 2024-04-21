//const {configureStore} = require('@reduxjs/toolkit');
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AuthSlice from '../Screens/AuthScreen/redux/AuthSlice';
// import AuthSlice from '../Screens/AuthScreen/redux/AuthSlice';


const rootreducer = combineReducers({
   'authslice':AuthSlice,
});

export const store = configureStore({
  reducer: rootreducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable state check
    }),
});

export default store;
