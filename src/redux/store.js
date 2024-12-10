import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import authApi from './auth/authApi'; 
import listingApi from './auth/listingApi'; 
import reviewApi from './auth/reviewApi'; 

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [listingApi.reducerPath]: listingApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, listingApi.middleware, reviewApi.middleware),
});

export const persistor = persistStore(store);

export default store;
