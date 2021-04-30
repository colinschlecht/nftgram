import {
  FETCH_ARTS,
  FETCH_ARTS_INF_SCROLL,
  LOADING_ARTS,
  RESET_ALL_LOADED,
  CREATE_ART_COMMENT,
  CREATE_COMMENT_COMMENT,
  CREATE_ART_LIKE,
  CREATE_COMMENT_LIKE,
  DESTROY_ART_LIKE,
  DESTROY_COMMENT_LIKE,
  CREATE_ART
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
    case CREATE_ART:
      // let newarts = [ ...state.arts]
      return {
        ...state,
        }
    case CREATE_COMMENT_COMMENT:
      return {
        ...state,
        arts: state.arts.map((item) => {
          item.comments.map((com) => {
            if (com.id !== action.payload.commentable_id) {
              return com;
            } else {
              let newCom = { ...com };
              newCom.comments.push(action.payload);
              return {
                ...newCom,
              };
            }
          });
          return item;
        }),
      };

    case RESET_ALL_LOADED:
      return { ...INITIAL_STATE };

    case CREATE_ART_LIKE:
      return {
        ...state,
        arts: state.arts.map((art) => {
          if (art.id !== action.payload.likeable_id) {
            return art;
          } else {
            let newArt = { ...art };
            newArt.likes.push(action.payload);
            return {
              ...newArt,
            };
          }
        }),
      };
    case DESTROY_ART_LIKE:
      return {
        ...state,
        arts: state.arts.map((art) => {
          if (art.id !== action.payload.likeable_id) {
            return art;
          } else {
            let newArt = { ...art };
            newArt.likes.map((like, index) => {
              if (like.id === action.payload.id) {
                newArt.likes.splice(index, 1);
              }
            });
            return {
              ...newArt,
            };
          }
        }),
      };
    case CREATE_COMMENT_LIKE:
      return {
        ...state,
        arts: state.arts.map((art) => {
          art.comments.map((com) => {
            if (com.id !== action.payload.likeable_id) {
              return com;
            } else {
              let newCom = { ...com };
              newCom.likes.push(action.payload);
              return {
                ...newCom,
              };
            }
          });
          return art;
        }),
      };
    case DESTROY_COMMENT_LIKE:
      return {
        ...state,
        arts: state.arts.map((art) => {
          art.comments.map((com) => {
            if (com.id !== action.payload.likeable_id) {
              return com;
            } else {
              let newCom = { ...com };
              newCom.likes.map((like, index) => {
                if (like.id === action.payload.id) {
                  newCom.likes.splice(index, 1);
                }
              });
              return {
                ...newCom,
              };
            }
          });
          return art;
        }),
      };
    default:
      return state;
  }
};

export default artReducer;
