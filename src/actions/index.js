import API_BASE from "../api";
import { SIGN_IN, SIGN_OUT, SIGN_UP, GET_USER } from "./types";

export const createUser = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/users", { ...formValues });

  dispatch({ type: SIGN_UP, payload: response.data });

  return response;
};

export const loginUser = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/login", { ...formValues });

  dispatch({ type: SIGN_IN, payload: response.data });

  return response;
};
export const getUser = (formValues) => async (dispatch) => {
  const response = await API_BASE.GET("/getuser", { ...formValues });

  dispatch({ type: GET_USER, payload: response.data });

  return response;
};

export const logOut = () => {
  return {
    type: SIGN_OUT,
  };
};
