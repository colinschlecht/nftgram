require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const getTransaction = async (txHash) => {
  console.log("geting transaction");
  let transaction = await web3.eth.getTransactionReceipt(txHash);
  console.log(`transaction: ${transaction}`);
  return transaction;
};



export const getProvider = async () => {
  const provider = await web3.eth.getChainId()
  return provider
};

export default web3;
