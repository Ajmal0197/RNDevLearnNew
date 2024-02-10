// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './noteSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    notesSlice: notesReducer,
    usersSlice: userReducer,
  },
});

// Below RootState & AppDispatch are used in hooks.ts
// Declare a type named RootState
export type RootState = ReturnType<typeof store.getState>;

// Explanation:
// - ReturnType: A utility type in TypeScript that extracts the return type of a function.
// - typeof store.getState: This gets the type of the 'getState' method of your Redux store.
// - RootState: This is the type of the entire state in your Redux store.

// Declare a type named AppDispatch
export type AppDispatch = typeof store.dispatch;

// Explanation:
// - typeof store.dispatch: This gets the type of the 'dispatch' method of your Redux store.
// - AppDispatch: This is the type of the dispatch function in your Redux store.

export default store;
