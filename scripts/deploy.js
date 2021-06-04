//!Used to deploy NFTgramIO
// async function main() {
//     const NFTgramIO = await ethers.getContractFactory("NFTgramIO");
    
//     // Start deployment, returning a promise that resolves to a contract object
//     const NFT = await NFTgramIO.deploy();
//     console.log("Contract deployed to address:", NFT.address);
//  }

//  main()
//    .then(() => process.exit(0))
//    .catch(error => {
//      console.error(error);
//      process.exit(1);
//    });

//!Used to deploy SaleFactory (Sales.sol)
async function main() {
    const SaleFactory = await ethers.getContractFactory("SaleFactory");
    
    // Start deployment, returning a promise that resolves to a contract object
    const Factory = await SaleFactory.deploy();
    console.log("Contract deployed to address:", Factory.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });