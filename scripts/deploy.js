async function main() {
    const NFTgramIO = await ethers.getContractFactory("NFTgramIO");
    
    // Start deployment, returning a promise that resolves to a contract object
    const NFT = await NFTgramIO.deploy();
    console.log("Contract deployed to address:", NFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });