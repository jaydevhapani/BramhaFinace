import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import rootReducer from './combineReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['navigation'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
