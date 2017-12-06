import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { task } from './task';
import { edit } from './edit';
import { completed } from './completed'

const AppData = combineReducers({
  task,
  edit,
  completed,
});
export const STORE = createStore(
  AppData,
  composeWithDevTools(applyMiddleware(thunk))
);
