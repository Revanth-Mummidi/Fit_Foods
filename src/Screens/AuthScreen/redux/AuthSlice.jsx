import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFireAuth } from '../../../config/firebase';
const initialState = {
  user:null,
  isAuthenticated:false,
  isLoading:false,
};

const AuthenticationSlice = createSlice({
  name: 'authslice',
  initialState:initialState,
  reducers: {
   setUserSignInState(state,action){
    state.isAuthenticated=action.payload.isAuthenticated;
    state.isLoading=false;
    state.user=action.payload.user;
   }
  },
  extraReducers:(builder)=>{
    builder.addCase(signInWithGoogle.fulfilled,(state,action)=>{
       state.isAuthenticated=true;
       state.isLoading=false;
       state.user=action.payload;
    }).addCase(signInWithGoogle.rejected,(state,action)=>{
        alert("authentication failed");
        state.isLoading=false;
    }).addCase(signInWithGoogle.pending,(state,action)=>{
        state.isAuthenticated=false;
        state.isLoading=true;
        state.user=null;
    }).addCase(signOutUser.fulfilled,(state,action)=>{
        state.isAuthenticated=false;
        state.isLoading=false;
        state.user=null;
    }).addCase(signOutUser.rejected,(state,action)=>{
        state.isLoading=false;
        alert("Signout Failed");
    }).addCase(signOutUser.pending,(state,action)=>{
        state.isLoading=true;
    })
  }
});

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle',async()=>{
   const provider = new GoogleAuthProvider();
   const data = await signInWithPopup(getFireAuth,provider);
   const {displayName,email,phoneNumber,photoURL,uid}=data.user;
   const token = await data.user.getIdToken();
   return {displayName,email,phoneNumber,photoURL,uid,token};
})

export const signOutUser = createAsyncThunk('auth/signOutUser',async()=>{
       await signOut(getFireAuth);
})

export const {setUserSignInState} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;