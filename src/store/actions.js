import { keyMirror } from './keyMirror';

export const ACTIONS = {
  addTask: payload => dispatch =>{
    dispatch({ type: TYPES.EDIT_CLEAR })
    dispatch({ type: TYPES.ADD_TASK, payload })
  },
  editTask: payload => dispatch => dispatch({ type: TYPES.EDIT_TASK, payload }),
  removeTask: payload => dispatch => dispatch({ type: TYPES.REMOVE_TASK, payload }),
  loadFromStorage: payload => dispatch => dispatch({ type: TYPES.LOAD_FROM_STORAGE, payload }),
};

export const TYPES = keyMirror({
  ADD_TASK: null,
  EDIT_TASK: null,
  EDIT_CLEAR: null,
  REMOVE_TASK: null,
  LOAD_FROM_STORAGE: null,
});
