import { /*GET_USER, SIGN_IN, SIGN_OUT,*/ SIGN_UP } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, isSignedIn: true, user: action.payload };
    // case SIGN_IN:
    //   return { ...state, isSignedIn: true, user: action.payload };
    // case SIGN_OUT:
    //   return { ...state, isSignedIn: false, user: null };
    // case GET_USER:
    //   return { ...state, isSignedIn: true, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
