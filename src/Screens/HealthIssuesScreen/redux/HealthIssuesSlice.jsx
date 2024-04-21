import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   health_issues:[],
};

const HealthIssueSlice = createSlice({
  name: 'healthissueslice',
  initialState:initialState,
  reducers: {
     setHealthIssuesAction(state,action){
        state.health_issues=action.payload;
     }
  },
  
  
});



export const {setHealthIssuesAction} = HealthIssueSlice.actions;
export default HealthIssueSlice.reducer;