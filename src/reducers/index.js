import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import userReducer from "./userReducer";
import artReducer from "./artReducer";
import metaMaskReducer from "./metaMaskReducer";
import saleReducer from "./saleReducer";

export default combineReducers({
  art: artReducer,
  auth: userReducer,
  MetaMask: metaMaskReducer,
  UI: UIReducer,
  sales: saleReducer,
});
