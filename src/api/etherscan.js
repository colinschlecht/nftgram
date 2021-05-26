require("dotenv").config();
const axios = require("axios");

const key = process.env.REACT_APP_ETHERSCAN_API_KEY;


export const getTransactionStatus = async (txHash) => {
//   const txUrl = `https://api-rinkeby.etherscan.io/api?module=transaction&action=getstatus&txhash=${txHash}&apikey=${key}`;
  const txUrl = `https://api-rinkeby.etherscan.io/api?module=transaction&action=getstatus&txhash=${txHash}&apikey=36RUPJM5TPCPPA6BCHIGD1M4YD8ICPECUG`;
  //making axios POST request to Pinata ⬇️
  return axios
    .get(txUrl)
    .then(function (response) {
      console.log(response);
      return {
        error: false,
        status: response.message,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
