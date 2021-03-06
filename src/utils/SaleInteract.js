require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require("../abi/SaleABI.json");

export const open = async (contractAddress) => {
  let saleContract = await new web3.eth.Contract(contractABI, contractAddress);
  //set up the Ethereum transaction
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: saleContract.methods.openTrade().encodeABI(), //make call to smart contract
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      message: "Item placed for Sale",
      transactionHash: txHash,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong: " + error.message,
    };
  }
};
export const cancel = async (contractAddress) => {
  let saleContract = await new web3.eth.Contract(contractABI, contractAddress);
  //set up the Ethereum transaction
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: saleContract.methods.cancelTrade().encodeABI(), //make call to smart contract
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      message: "Trade cancelled",
      transactionHash: txHash,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong: " + error.message,
    };
  }
};
export const purchase = async (contractAddress, price) => {
  let saleContract = new web3.eth.Contract(contractABI, contractAddress);
  try {
    const txHash = await saleContract.methods.purchaseToken().send({
      to: contractAddress,
      from: window.ethereum.selectedAddress,
      value: price,
    });
    return {
      success: true,
      message: "Trade initiated",
      transactionHash: txHash.transactionHash,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getSaleStatus = async (contractAddress) => {
  let saleContract = await new web3.eth.Contract(contractABI, contractAddress);
  return saleContract.methods.status().call();
};
export const getSaleSummary = async (contractAddress) => {
  let saleContract = await new web3.eth.Contract(contractABI, contractAddress);
  return saleContract.methods.getSummary().call();
};
