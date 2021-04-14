import API_BASE from "../api";
import {
//   SIGN_IN,
//   SIGN_OUT,
  SIGN_UP
} from "./types";


export const createUser = (formValues) => async (dispatch) => {
    const response = await API_BASE.post("/users", { ...formValues });
  
    dispatch({ type: SIGN_UP, payload: response.data });

    return response;
  };