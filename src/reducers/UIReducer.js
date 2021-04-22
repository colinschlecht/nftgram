import { SHOW_MENU } from "../actions/types";

const INITIAL_STATE = {
  nav_menu: hidden
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return { nav_menu: shown };
    default:
      return state;
  }
};

export default UIReducer;