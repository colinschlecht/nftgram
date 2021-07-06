require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
//salefactory contract
const contractABI = require("../abi/SaleFactoryABI.json");
const contractAddress = "0x1b635fa4228eFc68D1a76fCA35Cce47D375bB700";

let saleFactory;

export const create = async (itemAddress, item, price) => {
  saleFactory = new web3.eth.Contract(contractABI, contractAddress);

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
// export const create = async (itemAddress, item, price) => {

//   saleFactory = new web3.eth.Contract(contractABI, contractAddress);

//   //set up the Ethereum transaction
//   const transactionParameters = {
//     to: contractAddress,
//     from: window.ethereum.selectedAddress, // must match user's active address.
//     data: saleFactory.methods
//       .createSale(itemAddress, item, price)
//       .encodeABI(), //make call to smart contract
//   };

//   //sign the transaction via Metamask
//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     return {
//       success: true,
//       message: "Sale initiated",
//       transactionHash: txHash,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: "Something went wrong: " + error.message,
//     };
//   }
// };
