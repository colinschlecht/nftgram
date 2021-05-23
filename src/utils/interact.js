require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 


const contractABI = require('../abi/NFTgramIO-ABI.json')
const contractAddress = process.env.CONTRACT;