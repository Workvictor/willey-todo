import { TYPES } from './actions';
export const completed = (
  state = [],
  { type, payload }
) =>
    type === TYPES.COMPLETE_TASK
  ? [
      ...state.slice(),
      {
        ...payload,
        id: state.length
      }
    ]
  : type === TYPES.LOAD_FROM_STORAGE
  ? [ ...payload.completed ]
  : state;