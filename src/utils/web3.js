require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const getTransaction = async (txHash) => {
    let transaction = await web3.eth.getTransactionReceipt(txHash);
    return transaction;
  };

export default web3;
