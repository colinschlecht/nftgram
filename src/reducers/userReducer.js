import {
  ALL_USERS,
  SIGN_UP,
  UPDATE_USER,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user: null,
  isAdmin: false,
  all: []
};



const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
     
      return {
        ...state,
        isSignedIn: true,
        user: action.payload.user,
        isAdmin: action.payload.user.metamask_account === "0x71e79463868d9f56a805ec82db59c3c848693eb1",
      };
      case UPDATE_USER:
  
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        // isAdmin: action.payload.user.metamask_account === "0x71e79463868d9f56a805ec82db59c3c848693eb1",
      };
      case ALL_USERS:
  
      return {
        ...state,
        all: action.payload
        // isAdmin: action.payload.user.metamask_account === "0x71e79463868d9f56a805ec82db59c3c848693eb1",
      };

    
    default:
      return state;
  }
};

export default userReducer;
