import API_BASE from "../api";
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_USER,
  SHOW_USER,
  FETCH_ARTS,
  FETCH_ARTS_INF_SCROLL,
  LOADING_ARTS,
  RESET_ALL_LOADED,
  CREATE_ART_COMMENT
} from "./types";

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
export const getUser = (header, TOKEN) => async (dispatch) => {
  if (TOKEN && TOKEN !== "undefined") {
    const response = await API_BASE.get("/getuser", { ...header });
    dispatch({ type: GET_USER, payload: response.data });
    return response;
  }
};
//checks for user token
export const showUser = (id) => async (dispatch) => {
  const response = await API_BASE.get(`/users/${id}`);
  dispatch({ type: SHOW_USER, payload: response.data });
  return response;
};
//log out user
export const logOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//!Art actions//
//fetch to index route w/o filter
export const fetchArts = () => async (dispatch) => {
  const response = await API_BASE.get("/arts");
  dispatch({ type: FETCH_ARTS, payload: response.data });
  return response;
};

//fetch to 'explore' route for infinite scroll
export const explore = (page) => async (dispatch) => {
  const response = await API_BASE.get(`/explore/${page}`);
  dispatch({ type: FETCH_ARTS_INF_SCROLL, payload: response.data });
  return response;
};

//resets state
export const resetAllLoaded = () => {
  return {
    type: RESET_ALL_LOADED,
  };
};

//loading state
export const loadingArts = () => {
  return {
    type: LOADING_ARTS,
  };
};


//!Comment Actions
export const createComment = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/comments", { ...formValues });
  dispatch({ type: CREATE_ART_COMMENT, payload: response.data })
  return response.data;
};
