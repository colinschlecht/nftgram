import { FETCH_ALL_SALES_AND_CONTRACTS } from "../actions/types";
import web3 from "../utils/web3";
const INITIAL_STATE = {
  saleContracts: {},
  sales: [],
};

const AOH = (sales) => {
  let newSales = { ...sales };
  return [
    ...Object.values(newSales).map((item) => {
      return Object.assign({
        contract: item[0],
        poster: item[1],
        tokenAddress: item[2],
        price: item[3],
        status: web3.utils.hexToAscii(item[4]),
      });
    }),
  ];
};

const saleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_SALES_AND_CONTRACTS:
      let fetchedSales = AOH({ ...action.payload.sales });
      return {
        ...state,
        saleContracts: { ...action.payload.contracts },
        sales: [...fetchedSales],
      };
    default:
      return state;
  }
};

export default saleReducer;
