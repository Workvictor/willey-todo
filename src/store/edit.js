import { TYPES } from './actions';
const initial = {
  title: '',
  body: '',
  isCompleted: false,
  color: 'hsla(0, 100%, 100%, 1)',
}
export const edit = (
  state = initial,
  { type, payload }
) =>
    type === TYPES.EDIT_TASK
  ? {
      ...state,
      ...payload,
    }
  : type === TYPES.EDIT_CLEAR
  ? initial
  : state;
