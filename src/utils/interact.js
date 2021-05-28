require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

// const contractABI = require('../abi/contract-abi.json')
const contractABI = require("../abi/NFTgramIOABI.json");
const contractAddress = "0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692";
// const contractAddress = "0x50274041223B467Cc17030732b4A2Ab94fAFde7a";

export const mintNFT = async (uri) => {
  const tokenURI = uri;

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
      transactionHash: txHash,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong: " + error.message,
    };
  }
};

export const checkTransactionStatus = async (txHash) => {
  const transaction = await web3.eth.getTransactionReceipt(txHash);
  console.log("checking")
  if(!transaction){
    console.log("pending")
    return null
  } else {
    console.log(transaction)
    return {status: transaction.status}
  }
};

// export const checkTransactionStatus = async (txHash) => {
//   const pendingTransactions = await web3.eth.getPendingTransactions()
//   const pending = pendingTransactions.filter((trans) =>{ if (trans.hash === txHash) {
//     return true;
//   } else {
//     return false;
//   }})
//   if (pending) {
//     console.log("pending")//!
//     window.setTimeout(async() => {
//     await checkTransactionStatus(txHash)
//   }, 3500);
//   }
// };

export const subscribePendingTx = () => {
  const subscription = web3.eth
    .subscribe("pendingTransactions", (error, result) => {
      if (!error) {
        console.log(`Result:: ${result}`);
      } else {
        console.log(`Error:: ${error}`);
      }
    })
    .on("data", (transaction) => {
      console.log(`transaction:: ${transaction}`);
    });
  // unsubscribes the subscription
  subscription.unsubscribe(function (error, success) {
    if (success) {
      console.log("Successfully unsubscribed!");
    } else {
      console.log(`Error:: ${error}`);
    }
  });
};
