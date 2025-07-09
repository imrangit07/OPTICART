import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import userSlice from "../slice/userSlice"

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Combine your slices into a root reducer
const rootReducer = combineReducers({
  productCart: cartSlice,
  loginUser:userSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['productCart','loginUser'],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,

//    if(error) = A non-serializable value was detected in an action,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
  // Optional: Add devTools configuration
  devTools: process.env.NODE_ENV !== 'production',
//    if(error) = A non-serializable value was detected in an action,


});

// Create persistor for your app entry point
export const persistor = persistStore(store);

export default store;
