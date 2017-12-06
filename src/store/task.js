import { TYPES } from './actions';
export const task = (
  state = [
    {
      title: 'This is your very first task',
      body: 'Start working by typing new task in the field above',
      id: 0,
      color: 'hsla(0, 100%, 100%, 1)',
    }
  ],
  { type, payload }
) =>
    type === TYPES.ADD_TASK
  ? [
      ...state.slice(),
      {
        ...payload,
        id: state.length >0 ? state[state.length-1].id+1 : 0
      }
    ]
  : type === TYPES.COMPLETE_TASK
  ? [
      ...state.slice(0, state.findIndex(elem=>elem.id===payload.id)),
      ...state.slice(state.findIndex(elem=>elem.id===payload.id)+1),
    ]
  : type === TYPES.LOAD_FROM_STORAGE
  ? [ ...payload.active ]
  : type === TYPES.REMOVE_TASK
  ? [
      ...state.slice(0, state.findIndex(elem=>elem.id===payload.id)),
      ...state.slice(state.findIndex(elem=>elem.id===payload.id)+1),
    ]
  : type === TYPES.EDIT_TASK_BY_ID
  ? [
    ...state.slice(0, state.findIndex(elem=>elem.id===payload.id)),
      {
        ...state.find(elem=>elem.id===payload.id),
        ...payload,
      },
    ...state.slice(state.findIndex(elem=>elem.id===payload.id)+1),
  ]
  : state;
