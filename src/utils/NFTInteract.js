require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../abi/NFTgramIOABI.json");
const contractAddress = "0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692";

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

export const getTokenId = async (account) => {
  const arr = [];
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const supply = await contract.methods.totalSupply().call();

  const total = parseInt(supply);
  for (let i = 1; i < total; i++) {
    try {
      const id = await contract.methods.ownerOf(i).call();
      if (id.toLowerCase() === account) {
        arr.push(i);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return { id: arr[arr.length - 1], address: contractAddress };
};

export const checkTransactionStatus = async (txHash) => {
  const transaction = await web3.eth.getTransactionReceipt(txHash);
  if (!transaction) {
    return null;
  } else {
    console.log(transaction);
    return { status: transaction.status };
  }
};
