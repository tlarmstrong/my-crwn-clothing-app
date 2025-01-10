import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
  case USER_ACTION_TYPES.SET_CURRENT_USER:
    // spread through (preserve) current state and only replace specified values (currentUser)
    // assumes User has other attributes, besides the currentUser object
    return { ...state, currentUser: payload };
  default:
    return state;
  }
}
