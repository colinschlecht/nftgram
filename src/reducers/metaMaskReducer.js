import { CONNECT } from "../actions/types";

const INITIAL_STATE = {
  connected: false,
  account: ""
  // accounts: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connected: true,
        account: action.payload[0]
        // accounts: action.payload currently only 1 is returned, but may be changed by MM
      };
    default:
      return state;
  }
};

export default userReducer;
