import userReducer from './auth/authStore'
import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './features/roomStore.js'

export const store = configureStore({
  reducer: {
    user:userReducer,
    room:roomReducer,
  }, 
});


