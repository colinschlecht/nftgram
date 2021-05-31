require("@nomiclabs/hardhat-ganache");

/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { REACT_APP_API_URL, REACT_APP_PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},
      rinkeby: {
         url: REACT_APP_API_URL,
         accounts: [`0x${REACT_APP_PRIVATE_KEY}`]
      }
   },
   etherscan: {
     apiKey: process.env.ETHERSCAN_API_KEY
   }
}