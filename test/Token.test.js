


beforeEach(async () => {
    tokenUri = "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb"
    
    console.log(addr2)
    accounts = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(contractABI, contractAddress);
   
    //set up the Ethereum transaction
    const transactionParameters = {
        to: contractAddress, 
        from: accounts[0], 
        data: contract.methods
          .mintNFT(accounts[0], tokenURI)
          .encodeABI(), 
      };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        return {
          success: true,
          message:
            "Transaction hash: https://rinkeby.etherscan.io/tx/" +
            txHash,
            transactionHash: txHash
        };
      } catch (error) {
        return {
          success: false,
          message: "Something went wrong: " + error.message,
        };
      }
})




// describe("Mint nft", function() {
//   it("deploys an nft", async function() {
//       const token = await mint();
      // console.log(token.address)


    // const [owner] = await ethers.getSigners();

    // const Token = await ethers.getContractFactory("Token");

    // const hardhatToken = await Token.deploy();

    // const ownerBalance = await hardhatToken.balanceOf(owner.address);
    // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });
// });

