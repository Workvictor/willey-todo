import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { task } from './task';
const AppData = combineReducers({
  task,
});
export const STORE = createStore(
  AppData,
  composeWithDevTools(applyMiddleware(thunk))
);
