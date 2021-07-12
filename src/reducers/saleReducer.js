import { FETCH_ALL_SALES, FETCH_SALE, FETCH_ALL_SALES_COMPRESSED, REMOVE_SALE_STATE } from "../actions/types";
const INITIAL_STATE = {
  saleContracts: {},
  sales: [],
  sale: "",
};


const saleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMOVE_SALE_STATE:
      return {
        ...state,
        sales: [...action.payload.sales],
        sale: {...action.payload.sale},
      };
    case FETCH_ALL_SALES:
      return {
        ...state,
        sales: [...action.payload.sales],
      };
    case FETCH_ALL_SALES_COMPRESSED:
      return {
        ...state,
        sales: [...action.payload.sales],
      };
    case FETCH_SALE:
      return {
        ...state,
        sale: { ...action.payload.sale}
      };
    default:
      return state;
  }
};

export default saleReducer;
