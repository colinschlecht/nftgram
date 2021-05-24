import { combineReducers } from "redux";
import userReducer from "./userReducer";
import UIReducer from "./userReducer";
import artReducer from "./artReducer";
import metaMaskReducer from "./metaMaskReducer";

export default combineReducers({
  auth: userReducer,
  art: artReducer,
  UI: UIReducer,
  MetaMask: metaMaskReducer
});
