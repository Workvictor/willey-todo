import { keyMirror } from './keyMirror';

const storage = window.localStorage;

const saveToStorage = (taskList, field = 'active') => {
  storage.setItem(field, JSON.stringify(taskList));
};

export const ACTIONS = {
  addTask: payload => (dispatch, getStore) => {
    dispatch({ type: TYPES.EDIT_CLEAR });
    dispatch({ type: TYPES.ADD_TASK, payload });
    saveToStorage(getStore().task);
  },
  editTask: payload => (dispatch, getStore) => {
    payload.id !== undefined
      ? dispatch({ type: TYPES.EDIT_TASK_BY_ID, payload })
      : dispatch({ type: TYPES.EDIT_TASK, payload });
    saveToStorage(getStore().task);
  },
  editTaskByID: payload => (dispatch, getStore) => {
    dispatch({ type: TYPES.EDIT_TASK_BY_ID, payload });
    saveToStorage(getStore().task);
  },
  completeTask: payload => (dispatch, getStore) => {
    dispatch({ type: TYPES.COMPLETE_TASK, payload });
    saveToStorage(getStore().task);
    saveToStorage(getStore().completed, 'completed');
  },
  removeTask: payload => (dispatch, getStore) => {
    dispatch({ type: TYPES.REMOVE_TASK, payload });
    saveToStorage(getStore().task);
  },
  loadFromStorage: payload => dispatch =>
    dispatch({ type: TYPES.LOAD_FROM_STORAGE, payload })
};

export const TYPES = keyMirror({
  ADD_TASK: null,
  EDIT_TASK: null,
  EDIT_TASK_BY_ID: null,
  EDIT_CLEAR: null,
  COMPLETE_TASK: null,
  REMOVE_TASK: null,
  LOAD_FROM_STORAGE: null
});
