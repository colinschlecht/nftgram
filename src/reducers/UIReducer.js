import { ALERT, LOWER_ALERT, MODAL, CLOSE_MODAL, SET_DROPPED, SET_OPEN } from "../actions/types";

const INITIAL_STATE = {
  messages: [],
  modal: false,
  dropped: false,
  open: false
};

const UIReducer = (state = INITIAL_STATE, action) => {
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
    case SET_DROPPED:
      return { ...state, dropped: !state.dropped};
    case SET_OPEN:
      return { ...state, open: !state.open};
    default:
      return state;
  }
};

export default UIReducer;
