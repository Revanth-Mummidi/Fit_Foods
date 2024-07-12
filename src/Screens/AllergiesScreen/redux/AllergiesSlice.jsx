import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   allergy:[],
};

const AllergiesSlice = createSlice({
  name: 'allergyslice',
  initialState:initialState,
  reducers: {
     setAllergiesAction(state,action){
        state.allergy=action.payload;
     }
  },  
});



export const {setAllergiesAction} = AllergiesSlice.actions;
export default AllergiesSlice.reducer;