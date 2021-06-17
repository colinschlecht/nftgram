import { ALERT, LOWER_ALERT } from "../actions/types";

const INITIAL_STATE = {
  messages: [],
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALERT:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case LOWER_ALERT:
      const newMessages = [...state.messages].slice(1)
      return { ...state, messages: newMessages};
    default:
      return state;
  }
};

export default uiReducer;
