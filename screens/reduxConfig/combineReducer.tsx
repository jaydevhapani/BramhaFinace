import {combineReducers} from 'redux';

import loginSlice from './slices/loginSlice';
import commanSlice from './slices/commanSlice';

const rootReducer = combineReducers({
  loginSlice: loginSlice,
  commanSlice: commanSlice,
});

export default rootReducer;
