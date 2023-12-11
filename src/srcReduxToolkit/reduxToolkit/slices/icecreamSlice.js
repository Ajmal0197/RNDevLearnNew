import { createSlice } from '@reduxjs/toolkit';
import * as CakeActions from './cakeSlice';

const INITIAL_STATE = {
  numOfIceCreams: 30,
};

// https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice
const IcecreamSlice = createSlice({
  name: 'icecream',
  initialState: INITIAL_STATE,
  reducers: {
    ordered: (state) => {
      state.numOfIceCreams = Math.max(state.numOfIceCreams - 1, 0);
    },
    restocked: (state, action) => {
      state.numOfIceCreams += action.payload;
    },
  },
  // will act as default case reducers to your slice here
  extraReducers: (builder) => {
    builder.addCase(CakeActions.ordered, (state) => {
      state.numOfIceCreams--;
    });
  },
});

export const { ordered, restocked } = IcecreamSlice.actions;
export default IcecreamSlice.reducer;
