require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
//salefactory contract
const contractABI = require("../abi/SaleFactoryABI.json");
const contractAddress = "0x570218FAB496BC093AbC565585cC5bd33EfBb2DC";

const saleFactory = new web3.eth.Contract(contractABI, contractAddress);

export const create = async (itemAddress, item, price) => {

  //set up the Ethereum transaction
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: saleFactory.methods.createSale(itemAddress, item, price).encodeABI(), //make call to smart contract
  };

  // sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      message: "Sale initiated",
      transactionHash: txHash,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong: " + error.message,
    };
  }
};

export const sales = async () => {
  const listings = await saleFactory.methods.getSales().call()
  return listings
}
export const salesDetailed = async () => {
  const listings = await saleFactory.methods.getSalesDetailed().call()
  return listings
}

export const getTransaction = async (txHash) => {
  let transaction = await web3.eth.getTransactionReceipt(txHash);
  return transaction

}

