import { ORDER_ICECREAM, RESTOCK_ICECREAM } from '../actionCreators/icecreamActionCreators';

const INITIAL_STATE = {
  numOfIceCreams: 30,
};

const iceCreamReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_ICECREAM:
      return { ...state, numOfIceCreams: Math.max(state.numOfIceCreams - 1, 0) };
    case RESTOCK_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams + payload };
    default:
      return state;
  }
};

export default iceCreamReducer;
