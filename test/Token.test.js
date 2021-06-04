const assert = require("assert");
const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ganache");

//! to run the test, run the line of code below in your terminal
// npx hardhat --network ganache test

let tokenURI;
let accounts;
let testContract;
let contract;
let deployNFT;
let deployNFT2;
let signer0;
let signer1;

let saleFactoryPre;
let saleFactory;
let saleContract;
let saleContract2;
let trades;
let summary;

//!NFT contract
describe("nftgramio contract", function () {
  beforeEach(async function () {
    tokenURI =
      "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";
    testContract = await ethers.getContractFactory("NFTgramIO");
    accounts = await ethers.provider.listAccounts();
    contract = await testContract.deploy();
    deployNFT = await contract.mintNFT(accounts[0], tokenURI);
  });

  it("deploys an nft", async function () {
    try {
      const tx = await contract.mintNFT(accounts[0], tokenURI);
      assert(!!tx);
    } catch (error) {
      console.log(error);
    }
  });
  it("displays owner of specific token id", async function () {
    try {
      const owner = await contract.ownerOf(1);
      assert(owner === accounts[0]);
    } catch (error) {
      console.log(error);
    }
  });
  it("shows a balance", async function () {
    const balanceOfNone = await contract.balanceOf(accounts[9]);
    const balanceOfOne = await contract.balanceOf(accounts[0]);
    assert.strictEqual(parseInt(balanceOfNone), 0);
    assert.strictEqual(parseInt(balanceOfOne), 1);
  });

  it("allows for transfer of NFT", async function () {
    const ownerBefore = await contract.ownerOf(1);
    await contract.transferFrom(accounts[0], accounts[1], 1);
    const ownerAfter = await contract.ownerOf(1);
    assert.strictEqual(ownerBefore, accounts[0]);
    assert.strictEqual(ownerAfter, accounts[1]);
  });
  it("allows for 'safe transfer' of NFT", async function () {
    const ownerBefore = await contract.ownerOf(1);
    await contract["safeTransferFrom(address,address,uint256)"](
      accounts[0],
      accounts[1],
      1
    );
    const ownerAfter = await contract.ownerOf(1);
    assert.strictEqual(ownerBefore, accounts[0]);
    assert.strictEqual(ownerAfter, accounts[1]);
  });
  it("increments for each minted nft", async function () {
    await contract.mintNFT(accounts[0], tokenURI);
    await contract.mintNFT(accounts[0], tokenURI);
    const supply = await contract.totalSupply();
    assert(parseInt(supply) > 1);
  });
});

//!SaleFactory contract
describe("SaleFactory contract", function () {
  beforeEach(async function () {
    //nft
    accounts = await ethers.provider.listAccounts();
    signer0 = await ethers.provider.getSigner(accounts[0]);
    signer1 = await ethers.provider.getSigner(accounts[1]);
    testContract = await ethers.getContractFactory("NFTgramIO");
    contract = await testContract.deploy();
    deployNFT = await contract.mintNFT(accounts[0], tokenURI);
    deployNFT2 = await contract.mintNFT(accounts[0], tokenURI);
    //saleFactory
    saleFactoryPre = await ethers.getContractFactory("SaleFactory");
    saleFactory = await saleFactoryPre.deploy();
  });
  it("is deployable", async function () {
    assert(saleFactory);
  });

  it("has methods associated with the contract.", async function () {
    assert(Object.keys(saleFactory.functions));
  });

  it("can deploy a Sale Contract and provide the contract address", async function () {
    await saleFactory.createSale(contract.address, 1, 1);
    await saleFactory.createSale(contract.address, 2, 1);
    trades = await saleFactory.getSales();
    assert.strictEqual(trades.length, 2);
  });
  // it("can display the struct array", async function () {
  //   await saleFactory.createSale(contract.address, 10, 1);
  //   await saleFactory.createSale(contract.address, 200, 1);
  //   saleContract = await ethers.getContractAt("Sale", trades[0]);
  //   saleContract2 = await ethers.getContractAt("Sale", trades[1]);
  //   await contract.approve(trades[0], 1, { from: accounts[0] });
  //   await contract.approve(trades[1], 2, { from: accounts[0] });
  //   await saleContract.openTrade();
  //   await saleContract2.openTrade();
  //   trades = await saleFactory.getSalesDetailed();
  //   assert.strictEqual(trades.length, 2);
  //   console.log(trades)
  // });
});

// //!Deployed Sale contract
describe("Deployed Sale contract", function () {
  beforeEach(async function () {
    //nft
    accounts = await ethers.provider.listAccounts();
    signer0 = await ethers.provider.getSigner(accounts[0]);
    signer1 = await ethers.provider.getSigner(accounts[1]);
    testContract = await ethers.getContractFactory("NFTgramIO");
    contract = await testContract.deploy();
    deployNFT = await contract.mintNFT(accounts[0], tokenURI);
    deployNFT2 = await contract.mintNFT(accounts[0], tokenURI);
    //saleFactory
    saleFactoryPre = await ethers.getContractFactory("SaleFactory");
    saleFactory = await saleFactoryPre.deploy();
    //approve contract interraction
    await saleFactory.createSale(contract.address, 1, 1);
    await saleFactory.createSale(contract.address, 2, 1);
    trades = await saleFactory.getSales();
    await contract.approve(trades[0], 1, { from: accounts[0] });
    await contract.approve(trades[1], 2, { from: accounts[0] });
    //get sales contract
    saleContract = await ethers.getContractAt("Sale", trades[0]);
    saleContract2 = await ethers.getContractAt("Sale", trades[1]);
  });

  it("can display it's summary, and show status of pending", async function () {
    summary = await saleContract.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Pending");
  });

  it("openTrade can only be called by the owner", async function () {
    //this is reverted by ERC721 contract
    await expect(saleContract.connect(signer1).openTrade({ from: accounts[1] }))
      .to.be.reverted;
  });

  it("openTrade function can place an item for sale, and move token to escrow, and list status as 'Open'", async function () {
    await saleContract.openTrade();
    const ownerAddress = await contract.ownerOf(1);
    const contractAddress = saleContract.address;
    assert.strictEqual(ownerAddress, contractAddress);
    summary = await saleContract.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Open");
  });



  it("cancelTrade can cancel an item for sale, move the item back to the seller's ownership, and list the status as 'Cancelled'", async function () {
    await saleContract.openTrade();
    const ownerAddress = await contract.ownerOf(1);
    const contractAddress = saleContract.address;
    assert.strictEqual(ownerAddress, contractAddress);
    await saleContract.cancelTrade();
    const ownerAddressAfter = await contract.ownerOf(1);
    assert.strictEqual(ownerAddressAfter, accounts[0]);
    summary = await saleContract.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Cancelled");
  });

  it("cancelTrade will not cancel a sale that is outside of 'Open' status.", async function () {
    //Pending transaction
    summary = await saleContract.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Pending");
    await expect(saleContract.cancelTrade()).to.be.revertedWith(
      "Trade is not Open."
    );

    //Cancelled transaction
    await saleContract.openTrade();
    await saleContract.cancelTrade();
    summary = await saleContract.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Cancelled");
    await expect(saleContract.cancelTrade()).to.be.revertedWith(
      "Trade is not Open."
    );

    //Executed transaction
    await saleContract2.openTrade();
    await saleContract2.connect(signer1).purchaseToken({ value: 1, from: accounts[1] })
    summary = await saleContract2.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Executed");
    await expect(saleContract.cancelTrade()).to.be.revertedWith(
      "Trade is not Open."
    );
  });

  it("cancelPending can move a pending (yet to be Opened) Sale contract to Cancelled", async function () {
    const ownerAddress = await contract.ownerOf(1);
    assert.strictEqual(ownerAddress, accounts[0]);
    await saleContract.cancelPending();
    const summary = await saleContract.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Cancelled");
  });

  it("cancelPending will not cancel a sale that is outside of 'Pending' status.", async function () {
    //Open transaction
    await saleContract.openTrade();
    summary = await saleContract.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Open");
    await expect(saleContract.cancelPending()).to.be.revertedWith(
      "Trade is not Pending."
    );

    //Cancelled transaction
    await saleContract.cancelTrade();
    summary = await saleContract.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Cancelled");
    await expect(saleContract.cancelPending()).to.be.revertedWith(
      "Trade is not Pending."
    );

    //Executed transaction
    await saleContract2.openTrade();
    await saleContract2.connect(signer1).purchaseToken({ value: 1, from: accounts[1] })
    summary = await saleContract2.getSummary();
    status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Executed");
    await expect(saleContract.cancelPending()).to.be.revertedWith(
      "Trade is not Pending."
    );

  });
});

let theTrades;

//!PurchaseToken function
describe("Purchase Token function", function () {
  beforeEach(async function () {
    //nft
    accounts = await ethers.provider.listAccounts();
    signer0 = await ethers.provider.getSigner(accounts[0]);
    signer1 = await ethers.provider.getSigner(accounts[1]);
    testContract = await ethers.getContractFactory("NFTgramIO");
    contract = await testContract.deploy();
    deployNFT = await contract.mintNFT(accounts[0], tokenURI);
    deployNFT2 = await contract.mintNFT(accounts[0], tokenURI);
    //saleFactory
    saleFactoryPre = await ethers.getContractFactory("SaleFactory");
    saleFactory = await saleFactoryPre.deploy();
    //approve contract interraction
    await saleFactory.createSale(contract.address, 1, 1);
    await saleFactory.createSale(contract.address, 2, 1);
    trades = await saleFactory.getSales();
    await contract.approve(trades[0], 1, { from: accounts[0] });
    await contract.approve(trades[1], 2, { from: accounts[0] });
    //get sales contract
    saleContract = await ethers.getContractAt("Sale", trades[0]);
    saleContract2 = await ethers.getContractAt("Sale", trades[1]);
    //open trade
    await saleContract2.openTrade();
    theTrades = await saleFactory.getSalesDetailed();
    
  });

  it("will not allow an amount less than the asking price", async function () {
    await await expect(
      saleContract2
        .connect(signer1)
        .purchaseToken({ value: 0, from: accounts[1] })
    ).to.be.revertedWith("Payment must meet or exceed asking price.");
  });

  it("will not allow more than one account or user attempt to purchase", async function () {
    await saleContract2
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    await expect(
      saleContract2
        .connect(signer1)
        .purchaseToken({ value: 1, from: accounts[1] })
    ).to.be.revertedWith("Trade is not Open.");
  });

  it("will allow a reattempt at purchasing if first attempt fails due to insf funds", async function () {
    await await expect(
      saleContract2
        .connect(signer1)
        .purchaseToken({ value: 0, from: accounts[1] })
    ).to.be.revertedWith("Payment must meet or exceed asking price.");
    await saleContract2
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    summary = await saleContract2.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Executed");
  });

  it("will remove funds from the purchaser's account", async function () {
    let balanceBefore = await ethers.provider.getBalance(accounts[1]);
    await saleContract2
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    let balanceAfter = await ethers.provider.getBalance(accounts[1]);

    assert(balanceBefore._hex != balanceAfter._hex);
  });

  it("will call on execute trade, private function", async function () {
    await saleContract2
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    summary = await saleContract2.getSummary();
    const status = ethers.utils.parseBytes32String(summary[5]);
    assert.strictEqual(status, "Executed");
  });

  it("will transfer funds to the seller's account, async function", async function () {
    let balanceBefore = await ethers.provider.getBalance(accounts[0]);
    await saleContract2
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    let balanceAfter = await ethers.provider.getBalance(accounts[0]);
    assert(balanceBefore._hex != balanceAfter._hex);
  });
  it("will transfer NFT to the buyer's account", async function () {
    let ownerAddress = await contract.ownerOf(1);
    assert.strictEqual(ownerAddress, accounts[0])
    await saleContract.openTrade()
    await saleContract
      .connect(signer1)
      .purchaseToken({ value: 1, from: accounts[1] });
    ownerAddress = await contract.ownerOf(1);
    assert.strictEqual(ownerAddress, accounts[1])
   
  });
  it("test print", async function () {
    console.log(trades)
    console.log(summary)
    console.log(theTrades)
  })
 
});

//! Execute Trade function - no longer public function

// // describe("Execute trade", function () {
// //   beforeEach(async function () {
// //     //nft
// //     accounts = await ethers.provider.listAccounts();
// //     signer0 = await ethers.provider.getSigner(accounts[0]);
// //     signer1 = await ethers.provider.getSigner(accounts[1]);
// //     testContract = await ethers.getContractFactory("NFTgramIO");
// //     contract = await testContract.deploy();
// //     deployNFT = await contract.mintNFT(accounts[0], tokenURI);
// //     deployNFT2 = await contract.mintNFT(accounts[0], tokenURI);
// //     //saleFactory
// //     saleFactoryPre = await ethers.getContractFactory("SaleFactory");
// //     saleFactory = await saleFactoryPre.deploy();
// //     //approve contract interraction
// //     await saleFactory.createSale(contract.address, 1, 1);
// //     await saleFactory.createSale(contract.address, 2, 1);
// //     trades = await saleFactory.getSales();
// //     await contract.approve(trades[0], 1, { from: accounts[0] });
// //     await contract.approve(trades[1], 2, { from: accounts[0] });
// //     //get sales contract
// //     saleContract = await ethers.getContractAt("Sale", trades[0]);
// //     saleContract2 = await ethers.getContractAt("Sale", trades[1]);
// //   });

// // it("executeTrade function will deny Executing a sale on an order that is in Pending, Executed, or Cancelled status", async function () {
// //     //Pending transaction
// //     summary = await saleContract.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Pending");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");

// //   //   //Cancelled transaction
// //     await saleContract.openTrade();
// //     await saleContract.cancelTrade();
// //     summary = await saleContract.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Cancelled");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");

// //     //Executed transaction
// //     await saleContract2.openTrade();
// //     await saleContract2.connect(signer1).purchaseToken({ value: 1, from: accounts[1] })
// //     await saleContract2.connect(signer1).executeTrade({ from: accounts[1] });
// //     summary = await saleContract2.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Executed");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");
// //   });

// // it("executeTrade will not execute a sale that is outside of 'Locked' status.", async function () {
// //     //Pending transaction
// //     summary = await saleContract.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Pending");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");

// //     //Cancelled transaction
// //     await saleContract.openTrade();
// //     await saleContract.cancelTrade();
// //     summary = await saleContract.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Cancelled");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");

// //     //Open transaction
// //     await saleContract2.openTrade();
// //     summary = await saleContract2.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Open");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");

// //     //Executed transaction
// //     await saleContract2.connect(signer1).purchaseToken({ value: 1, from: accounts[1] })
// //     summary = await saleContract2.getSummary();
// //     status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Executed");
// //     await expect(
// //       saleContract.connect(signer1).executeTrade({ from: accounts[1] })
// //     ).to.be.revertedWith("Trade is not locked in.");
// //   });

// //   it("executeTrade can transfer an item for sale, move the item into the buyer's ownership, and list the status as 'Executed'", async function () {
// //     await saleContract.openTrade();
// //     const ownerAddress = await contract.ownerOf(1);
// //     const contractAddress = saleContract.address;
// //     assert.strictEqual(ownerAddress, contractAddress);
// //     await saleContract.connect(signer1).purchaseToken({ value: 1, from: accounts[1] })
// //     await saleContract.connect(signer1).executeTrade({ from: accounts[1] });
// //     const ownerAddressAfter = await contract.ownerOf(1);
// //     assert.strictEqual(ownerAddressAfter, accounts[1]);
// //     const summary = await saleContract.getSummary();
// //     const status = ethers.utils.parseBytes32String(summary[5]);
// //     assert.strictEqual(status, "Executed");
// //   });
// //   });
