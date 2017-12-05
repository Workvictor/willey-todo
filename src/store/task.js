import { TYPES } from './actions';
export const task = (
  state = [
    {
      title: 'This is your very first task',
      body: 'Start working by typing new task in the field above',
      id: 1,
      isCompleted: false,
      color: 'hsla(0, 100%, 100%, 1)',
    }
  ],
  { type, payload }
) =>
    type === TYPES.ADD_TASK
  ? [
      ...state.slice(),
      payload
    ]
  : type === TYPES.EDIT_TASK
  ? [
      ...state.slice(0, state.findIndex(elem=>elem.id===payload.id)),
      payload,
      ...state.slice(state.findIndex(elem=>elem.id===payload.id)+1),
    ]
  : type === TYPES.REMOVE_TASK
  ? [
      ...state.slice(0, state.findIndex(elem=>elem.id===payload.id)),
      ...state.slice(state.findIndex(elem=>elem.id===payload.id)+1),
    ]
  : type === TYPES.LOAD_FROM_STORAGE
  ? [ ...payload ]
  : state;
