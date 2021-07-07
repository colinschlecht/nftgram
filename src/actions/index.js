import API_BASE from "../api";
import {
  ALERT,
  LOWER_ALERT,
  CREATE_ART,
  SHOW_MENU,
  // SIGN_IN,
  // SIGN_OUT,
  SIGN_UP,
  // GET_USER,
  // SHOW_USER,
  UPDATE_USER,
  FETCH_ARTS,
  FETCH_ARTS_INF_SCROLL,
  LOADING_ARTS,
  RESET_ALL_LOADED,
  CREATE_ART_COMMENT,
  CREATE_ART_SHOW_COMMENT,
  CREATE_COMMENT_COMMENT,
  CREATE_ART_LIKE,
  CREATE_COMMENT_LIKE,
  DESTROY_ART_LIKE,
  DESTROY_COMMENT_LIKE,
  CONNECT,
  SEND_ART_TO_STATE,
  SEND_ARTS_TO_STATE,
  REMOVE_STATE,
  MODAL,
  CLOSE_MODAL,
} from "./types";

//!METAMASK!//
export const connect = (accts) => async (dispatch) => {
  dispatch({ type: CONNECT, payload: accts });
};

//! UI
export const raiseAlert = (msg) => async (dispatch) => {
  dispatch({ type: ALERT, payload: msg });
};
export const openModal = (modal) => async (dispatch) => {
  dispatch({ type: MODAL, payload: modal });
};
export const closeModal = () => async (dispatch) => {
  dispatch({ type: CLOSE_MODAL, payload: false });
};
export const lowerAlert = () => async (dispatch) => {
  window.setTimeout(() => {
    dispatch({ type: LOWER_ALERT, payload: null });
  }, 3000);
};

//!user actions!//
//create user and sign in
export const createUser = (account) => async (dispatch) => {
  const response = await API_BASE.post("/users", { ...account });
  dispatch({ type: SIGN_UP, payload: response.data });
  return response;
};
export const showUser = async (id) => {
  const response = await API_BASE.get(`/users/${id}`);
  // dispatch({ type: SHOW_USER, payload: response.data });
  return response;
};
export const updateUser = (id, userInfo) => async (dispatch) => {
  const response = await API_BASE.patch(`/users/${id}`, { ...userInfo });
  dispatch({ type: UPDATE_USER, payload: response.data });
  return response;
};
export const generate = async () => {
  const response = await API_BASE.get(`/generate`);
  return response;
};
// //login user
// export const loginUser = (formValues) => async (dispatch) => {
//   const response = await API_BASE.post("/login", { ...formValues });
//   dispatch({ type: SIGN_IN, payload: response.data });
//   return response;
// };
// //checks for user token
// export const getUser = (header, TOKEN) => async (dispatch) => {
//   if (TOKEN && TOKEN !== "undefined") {
//     const response = await API_BASE.get("/getuser", { ...header });
//     dispatch({ type: GET_USER, payload: response.data });
//     return response;
//   }
// };

//log out user
// export const logOut = () => {
//   return {
//     type: SIGN_OUT,
//   };
// };

//!Art actions//

export const createArt = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/arts", { ...formValues });
  dispatch({ type: CREATE_ART, payload: response.data });
  return response;
};
export const updateArt = (id, artInfo) => async (dispatch) => {
  const response = await API_BASE.patch(`/arts/${id}`, { ...artInfo });
  dispatch({ type: FETCH_ARTS, payload: response.data });
  return response;
};

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

export const showArt = (id) => async (dispatch) => {
  const response = await API_BASE.get(`/arts/${id}`);
  dispatch({ type: FETCH_ARTS, payload: response.data });
  return response;
};

export const removeState = () => async (dispatch) => {
  dispatch({ type: REMOVE_STATE, payload: [] });
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
export const showMenu = () => {
  return {
    type: SHOW_MENU,
  };
};

//send previously fetched art object to state
export const sendArtToState = (art) => async (dispatch) => {
  dispatch({ type: SEND_ART_TO_STATE, payload: art });
};
//send previously fetched art array to state
export const sendArtsToState = (art) => async (dispatch) => {
  dispatch({ type: SEND_ARTS_TO_STATE, payload: art });
};

//!Comment Actions
export const createComment = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/comments", { ...formValues });
  dispatch({ type: CREATE_ART_COMMENT, payload: response.data });
  return response.data;
};
export const createCommentComment = (formValues) => async (dispatch) => {
  const response = await API_BASE.post("/comments", { ...formValues });
  dispatch({ type: CREATE_COMMENT_COMMENT, payload: response.data });
  return response.data;
};
export const createArtShowComment = (comment) => async (dispatch) => {
  const response = await API_BASE.post("/comments", { ...comment });
  dispatch({ type: CREATE_ART_SHOW_COMMENT, payload: response.data });
  return response.data;
};

//!Like Actions
//create
export const createArtLike = (values) => async (dispatch) => {
  const response = await API_BASE.post("/likes", { ...values });
  dispatch({ type: CREATE_ART_LIKE, payload: response.data });
  return response.data;
};
export const createCommentLike = (values) => async (dispatch) => {
  const response = await API_BASE.post("/likes", { ...values });
  dispatch({ type: CREATE_COMMENT_LIKE, payload: response.data });
  return response.data;
};
//destroy
export const destroyArtLike = (id, disLike) => async (dispatch) => {
  const response = await API_BASE.delete(`/likes/${id}`);
  dispatch({ type: DESTROY_ART_LIKE, payload: disLike });
  return response.data;
};
export const destroyCommentLike = (id, dislike) => async (dispatch) => {
  const response = await API_BASE.delete(`/likes/${id}`);
  dispatch({ type: DESTROY_COMMENT_LIKE, payload: dislike });
  return response.data;
};
