import API_BASE from "../api";
import { SIGN_IN, SIGN_OUT, SIGN_UP, GET_USER } from "./types";



//!user actions!//
//create user and sign in
export const createUser = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/users", { ...formValues });
  dispatch({ type: SIGN_UP, payload: response.data });
  return response;
};
//login user
export const loginUser = (formValues) => async (dispatch) => {
    const response = await API_BASE.post("/login", { ...formValues });
    dispatch({ type: SIGN_IN, payload: response.data });
    return response;
};
//checks for user token
export const getUser = (header) => async (dispatch) => {
    const response = await API_BASE.get("/getuser", { ...header });
    dispatch({ type: GET_USER, payload: response.data });
    return response;
};
//log out user
export const logOut = () => {
  return {
    type: SIGN_OUT,
  };
};
