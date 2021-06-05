require("dotenv").config();
const axios = require("axios");

const key = process.env.REACT_APP_ETHERSCAN_API_KEY;


export const getNFTHistory = async (address) => {
//   const txUrl = `https://api-rinkeby.etherscan.io/api?module=transaction&action=getstatus&txhash=${txHash}&apikey=${key}`;
  const URL = `https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${key}`
  //making axios POST request to Etherscan
  return axios
    .get(URL)
    .then(function (response) {
      return {
       response
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.data.result,
      };
    });
};
