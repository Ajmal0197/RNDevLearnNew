import { legacy_createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Reactotron from './reactotronConfig/ReactotronConfig';

const middlewares = [thunk, logger];
const enhancer = compose(applyMiddleware(...middlewares), Reactotron.createEnhancer());
const store = legacy_createStore(reducers, enhancer);
// console.log('INITIAL STATE', store.getState());
store.subscribe(() => {
  console.log(store.getState());
});
export default store;
