import { CONNECT } from "../actions/types";

const INITIAL_STATE = {
  connected: false,
  accounts: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connected: true,
        account: action.payload[0],
        accounts: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
