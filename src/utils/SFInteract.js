import { getOwner } from "./NFTInteract";
require("dotenv").config();

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
//salefactory contract
const contractABI = require("../abi/SaleFactoryABI.json");
const contractAddress = "0xC46578d68C8e876E8f6FB4759bd679A3B256D3c5";

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

export const salesContracts = async () => {
  const listingContracts = await saleFactory.methods.getSales().call();
  return listingContracts;
};
export const salesDetailed = async () => {
  const listings = await saleFactory.methods.getSalesDetailed().call();
  return [
    ...Object.values(listings).map((item) => {
      return Object.assign({
        contract: item[0],
        poster: item[1],
        tokenAddress: item[2],
        tokenID: item[3],
        price: web3.utils.fromWei(item[4], "ether"),
        status: web3.utils.hexToAscii(item[5]),
      });
    }),
  ];
};
export const salesCompressed = async () => {
  const listings = await saleFactory.methods.getSalesDetailed().call();
  const listingsAOH = [
    ...Object.values(listings).map((item) => {
      return Object.assign({
        contract: item[0],
        poster: item[1],
        tokenAddress: item[2],
        tokenID: item[3],
        price: web3.utils.fromWei(item[4], "ether"),
        status: web3.utils.hexToAscii(item[5]),
      });
    }),
  ];
  const compressed = Object.fromEntries(
    listingsAOH.map((list) => [list.contract, list])
  );
  return compressed;
};

export const oneSaleDetailed = async (id) => {
  let saleContract = await getOwner(id);
  const allSales = await salesCompressed();
  return allSales[saleContract];
};

export const getTransaction = async (txHash) => {
  let transaction = await web3.eth.getTransactionReceipt(txHash);
  return transaction;
};
