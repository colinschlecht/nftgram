require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require("../abi/SaleFactoryABI.json");


export const open = async (contractAddress) => {

    saleFactory = new web3.eth.Contract(contractABI, contractAddress);
  
    //set up the Ethereum transaction
    const transactionParameters = {
      to: contractAddress,
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: saleFactory.methods
        .openTrade(itemAddress, item, price)
        .encodeABI(), //make call to smart contract
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