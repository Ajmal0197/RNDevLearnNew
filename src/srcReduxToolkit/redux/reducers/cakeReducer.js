import { ORDER_CAKE, RESTOCK_CAKE } from '../actionCreators/cakeActionCreators';

const INITIAL_STATE = {
  numOfCakes: 10,
};

const cakeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CAKE:
      state.numOfCakes = Math.max(state.numOfCakes - 1, 0);
      return state;
    // return {...state, numOfCakes: Math.max(state.numOfCakes - 1, 0)};
    case RESTOCK_CAKE:
      return { ...state, numOfCakes: state.numOfCakes + payload };
    default:
      return state;
  }
};

export default cakeReducer;
