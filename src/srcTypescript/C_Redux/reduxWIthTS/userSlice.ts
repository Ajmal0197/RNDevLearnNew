import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

// Define the type for the user object returned by the API
interface User {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

// Define the type for the initial state
interface UserState {
  loading: boolean;
  users: User[];
  error: string;
}

// Create an enum for action types to avoid string literals
enum UserActionTypes {
  //   PUSH_TO_USERS = 'user/pushToUsers',
  FETCH_USERS = 'user/fetchUsers',
}

// Create an async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk<User[]>(
  UserActionTypes.FETCH_USERS,
  async (_, thunkApi) => {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      // Handle the error if the API call fails
      throw new Error('Failed to fetch users');
    }
  }
);

// Define the initial state
const INITIAL_STATE: UserState = {
  loading: false,
  users: [],
  error: '',
};

// Create a Redux toolkit slice for managing the 'user' state
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    // Define a reducer to push a new user to the 'users' array
    pushToUsers: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
  },
  // Define extra reducers to handle the asynchronous API call
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || 'An error occurred';
    });
  },
});

// Export the actions and reducer from the slice
export const { pushToUsers } = userSlice.actions;
export const usersSelector = (state: RootState) => state.usersSlice;
export default userSlice.reducer;
