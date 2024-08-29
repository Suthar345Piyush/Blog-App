import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: false,
  userData: null
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   // login and logout which is under reducers are actions which we are exporting at the end
     login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
     },

     logout: (state) => {
      state.status = false,
      state.userData = null
     }
  }
})


export const {login , logout} = authSlice.actions;

export default authSlice.reducer;