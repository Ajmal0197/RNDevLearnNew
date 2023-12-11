import {
  FETCHING_USER,
  FETCHING_USER_FAILED,
  FETCHING_USER_SUCCESS,
} from '../actionCreators/userDataAsyncActionCreator';

const INITIAL_STATE = {
  loading: false,
  users: [],
  error: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHING_USER:
      return { ...state, loading: true };
    case FETCHING_USER_SUCCESS:
      return { loading: false, users: payload, error: '' };
    case FETCHING_USER_FAILED:
      return { loading: false, users: [], error: payload };
    default:
      return state;
  }
};

export default userReducer;
