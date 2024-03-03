import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  myName: 'AJMAL',
  numOfCakes: 10,
  arrayOfRtkData: [],
};

// https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice
const CakeSlice = createSlice({
  name: 'cake', // differentiation for avoiding mismatch of action creator
  initialState: INITIAL_STATE,
  reducers: {
    ordered: (state) => {
      const max = Math.max(state.numOfCakes - 1, 0);
      state.numOfCakes = max;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
    setArrayOfRtkDataAction: (state, action) => {
      state.arrayOfRtkData = action.payload;
    },
    setRTKCreatedDataAction: (state, action) => {
      state.createdRtkData = action.payload;
    },
  },
});

export const { ordered, restocked, setArrayOfRtkDataAction, setRTKCreatedDataAction } =
  CakeSlice.actions;
export default CakeSlice.reducer;
