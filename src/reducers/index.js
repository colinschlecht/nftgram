import { combineReducers } from "redux";
import userReducer from "./userReducer";
import artReducer from "./artReducer";

export default combineReducers({
  auth: userReducer,
  art: artReducer
});
