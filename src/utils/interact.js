require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 


const contractABI = require('../abi/NFTgramIO-ABI.json')
const contractAddress = process.env.CONTRACT;


export const mintNFT = async (uri) => {


    const tokenURI = uri
  
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  
    //set up the Ethereum transaction
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
        .mintNFT(window.ethereum.selectedAddress, tokenURI)
        .encodeABI(), //make call to NFT smart contract
    };
  
    //sign the transaction via Metamask
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        success: true,
        message:
          "Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong: " + error.message,
      };
    }
  };
  