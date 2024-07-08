import {createSlice} from '@reduxjs/toolkit';

export const CommanSlice = createSlice({
  name: 'CommanSlice',
  initialState: {
    isLoader: false,
    userProfileData: undefined,
    socialLinks : undefined,
  },
  reducers: {
    isLoaderState: (state, action) => {
      state.isLoader = action.payload;
    },
    userProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
    setAllSocialLinks: (state, action) => {
      state.socialLinks = action.payload;
    },
  },
});

export const {isLoaderState, userProfileData, setAllSocialLinks} = CommanSlice.actions;

export default CommanSlice.reducer;
