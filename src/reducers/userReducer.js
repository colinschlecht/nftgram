import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};

export default userReducer;
