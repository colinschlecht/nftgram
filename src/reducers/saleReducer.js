import { FETCH_ALL_SALES, FETCH_SALE } from "../actions/types";
import web3 from "../utils/web3";
const INITIAL_STATE = {
  saleContracts: {},
  sales: [],
  sale: "",
};


const saleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_SALES:
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
