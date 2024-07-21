import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     foodData:[],
     itemData:null
};

const FoodSlice = createSlice({
  name: 'foodslice',
  initialState:initialState,
  reducers: {
     setFoodData(state,action){
        state.foodData=action.payload;
     },
     setFoodItem(state,action){
        state.itemData=action.payload;
     }
  },
  
  
});



export const {setFoodData,setFoodItem} = FoodSlice.actions;
export default FoodSlice.reducer;