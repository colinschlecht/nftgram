import { combineReducers } from "redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import artReducer from "./artReducer";
import metaMaskReducer from "./metaMaskReducer";

export default combineReducers({
  art: artReducer,
  auth: userReducer,
  MetaMask: metaMaskReducer,
  UI: uiReducer,
});
