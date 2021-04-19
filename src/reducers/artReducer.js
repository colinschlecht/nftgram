import {
  FETCH_ARTS,
  FETCH_ARTS_INF_SCROLL,
  LOADING_ARTS,
  RESET_ALL_LOADED,
  CREATE_ART_COMMENT,
} from "../actions/types";

const INITIAL_STATE = {
  arts: [],
  page: 0,
  allLoaded: false,
  loading: false,
};

const artReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTS:
      // let fetchedArts = action.payload.data;
      return { ...state };
    case LOADING_ARTS:
      return { ...state, loading: true };
    case FETCH_ARTS_INF_SCROLL:
      let fetchedArts = action.payload;
      return {
        ...state,
        arts: [...state.arts, ...fetchedArts],
        page: state.page + 1,
        allLoaded: fetchedArts.length < 21 ? true : false,
        loading: false,
      };
    case CREATE_ART_COMMENT:
      return {
        ...state,
        arts: state.arts.map((item) => {
          if (item.id !== action.payload.commentable_id) {
            // This isn't the item we care about - keep it as-is
            return item;
          } else {
            let newItem = { ...item };
            newItem.comments.push(action.payload);
            return {
              ...newItem,
            };
          }
        }),
      };
    case RESET_ALL_LOADED:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default artReducer;
