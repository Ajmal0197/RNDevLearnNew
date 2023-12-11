import { combineReducers } from 'redux';
import cakeReducer from './cakeReducer';
import iceCreamReducer from './iceCreamReducer';
import userReducer from './usersReducer';

const reducers = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
  users: userReducer,
});

export default reducers;
