import { ALERT, LOWER_ALERT, MODAL, CLOSE_MODAL } from "../actions/types";

const INITIAL_STATE = {
  messages: [],
  modal: false,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALERT:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case LOWER_ALERT:
      const newMessages = [...state.messages].slice(1);
      return { ...state, messages: newMessages };
    case MODAL:
      return { ...state, modal: action.payload };
    case CLOSE_MODAL:
      return { ...state, modal: false};
    default:
      return state;
  }
};

export default uiReducer;
