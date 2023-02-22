import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import  useReducer  from './reducer/user';
import  postReducer from './reducer/post'
import  postDetailsReducer from './reducer/postDetails'
import locationReducer from './reducer/currentLocation'

const reducers = combineReducers({
  useReducer,
  postReducer,
  postDetailsReducer,
  locationReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
);
