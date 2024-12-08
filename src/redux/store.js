import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence
import authApi from './auth/authApi';
import listingApi from './auth/listingApi';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer, // Add the user slice reducer
  [authApi.reducerPath]: authApi.reducer, // Add the auth API reducer
  [listingApi.reducerPath]: listingApi.reducer, // Add the listing API reducer
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist compatibility
    }).concat(authApi.middleware, listingApi.middleware), // Add API middlewares
});

// Initialize the persistor
export const persistor = persistStore(store);

export default store;
