// Import necessary functions and types from the 'react-redux' library and your custom 'store' file
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Define a custom hook for dispatching actions using the useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Explanation:
// - useAppDispatch: This is a custom hook that uses the useDispatch hook to get access to the dispatch function.
// - useDispatch<AppDispatch>(): This enforces that the returned dispatch function has the type AppDispatch.

// Define a custom hook for selecting values from the Redux store using the useSelector hook
// Use the TypedUseSelectorHook to provide TypeScript type information about the Redux store state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Explanation:
// - useAppSelector: This is a custom hook that uses the useSelector hook to select values from the Redux store.
// - TypedUseSelectorHook<RootState>: This provides TypeScript type information about the Redux store state.
//   It ensures that the selected values are correctly typed based on your RootState type.
