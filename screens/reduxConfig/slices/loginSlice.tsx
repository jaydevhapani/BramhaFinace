import {createSlice} from '@reduxjs/toolkit';

export const LoginAuth = createSlice({
  name: 'LoginAuth',
  initialState: {
    userData: undefined,
  },
  reducers: {
    loginAuth: (state, action) => {      
      state.userData = action.payload;
    },
  },
});

export const {loginAuth} = LoginAuth.actions;

export default LoginAuth.reducer;
