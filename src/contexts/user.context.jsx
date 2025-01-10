import { createContext, useEffect, useReducer } from 'react';

import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth 
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

// actual value we want to access
export const UserContext = createContext({
  // base current state
  currentUser: null,
  setCurrentUser: () => null,

});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
  case USER_ACTION_TYPES.SET_CURRENT_USER:
    // spread through (preserve) current state and only replace specified values (currentUser)
    // assumes User has other attributes, besides the currentUser object
    return {
      ...state,
      currentUser: payload
    }
  default:
    throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null
};

// literal functional component
// alias component that allows us to wrap our user around the children
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}
