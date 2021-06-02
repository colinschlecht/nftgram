const assert = require("assert");
const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ganache");

// const ganache = require("ganache-cli");
// const Web3 = require("web3");
// const web3 = new Web3(ganache.provider());

// const contractABI = require("../src/abi/NFTgramIOABI.json");
// const contractAddress = "0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692"

//! npx hardhat --network ganache test

let accounts;
let testContract;
let contract;
let deployNFT;
let deployNFT2;
let signer0;
let signer1;

let salesFactoryPre;
let salesFactory;
let saleContract;
let saleContract2;
let trades;
let summary;


//!NFT contract
describe("nftgramio contract", function () {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";

  beforeEach(async function () {
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

//!SalesFactory contract
describe("SalesFactory contract", function () {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";

  beforeEach(async function () {
    //nft
    accounts = await ethers.provider.listAccounts();
    signer0 = await ethers.provider.getSigner(accounts[0]);
    signer1 = await ethers.provider.getSigner(accounts[1]);
    testContract = await ethers.getContractFactory("NFTgramIO");
    contract = await testContract.deploy();
    deployNFT = await contract.mintNFT(accounts[0], tokenURI);
    deployNFT2 = await contract.mintNFT(accounts[0], tokenURI);
    //salesFactory
    salesFactoryPre = await ethers.getContractFactory("SaleFactory");
    salesFactory = await salesFactoryPre.deploy();
  });
  it("is deployable", async function () {
    assert(salesFactory);
  });

  it("has methods associated with the contract.", async function () {
    assert(Object.keys(salesFactory.functions));
  });
  
  it("can deploy a Sale Contract and provide the contract address", async function () {
    await salesFactory.createSale(contract.address, 1, 1);
    await salesFactory.createSale(contract.address, 2, 1);
    const trades = await salesFactory.getSales();
    assert.strictEqual(trades.length, 2)
  });
});

//!Deployed Sale contract
describe("Deployed Sale contract", function () {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";

    
  beforeEach(async function () {
    //approve contract interraction
    trades = await salesFactory.getSales();
    await contract.approve(trades[0], 1, { from: accounts[0] });
    await contract.approve(trades[1], 2, { from: accounts[0] });
    //get sales contract
    saleContract = await ethers.getContractAt("Sale", trades[0]);
    saleContract2 = await ethers.getContractAt("Sale", trades[1])
  });

it("can display it's summary, and show status of pending", async function () {
  summary = await saleContract.getSummary();
  const status = ethers.utils.parseBytes32String(summary[4])
  assert.strictEqual(status, "Pending");
});

it("can place an item for sale, and move token to escrow", async function () {
  await contract.approve(sale.address, 1, { from: accounts[0] });
  await sale.openTrade();
  const ownerAddress = await contract.ownerOf(1);
  const contractAddress = sales.address;
  assert.strictEqual(ownerAddress, contractAddress);
});

it("can cancel an item for sale, move the item back to the seller's ownership, and list the status as 'Cancelled'", async function () {
  await contract.approve(sales.address, 1, { from: accounts[0] });
  await sales.openTrade();
  const ownerAddress = await contract.ownerOf(1);
  const contractAddress = sales.address;
  assert.strictEqual(ownerAddress, contractAddress);
  await sales.cancelTrade();
  const ownerAddressAfter = await contract.ownerOf(1);
  assert.strictEqual(ownerAddressAfter, accounts[0]);
  const summary = await sales.getSummary();
  assert.strictEqual(
    ethers.utils.parseBytes32String(summary[4]),
    "Cancelled"
  );
});

it("can transfer an item for sale, move the item into the buyer's ownership, and list the status as 'Executed'", async function () {
  await contract.approve(sales.address, 1, { from: accounts[0] });
  await sales.openTrade();
  const ownerAddress = await contract.ownerOf(1);
  const contractAddress = sales.address;
  assert.strictEqual(ownerAddress, contractAddress);
  await sales.connect(signer1).executeTrade({ from: accounts[1] });
  const ownerAddressAfter = await contract.ownerOf(1);
  assert.strictEqual(ownerAddressAfter, accounts[1]);
  const summary = await sales.getSummary();
  const status = ethers.utils.parseBytes32String(summary[4]);
  assert.strictEqual(status, "Executed");
  console.log(status);
});


});
  
//!ToDo: Update Smart Contract & Set up tests for passing ethereum with the trade.
//!ToDo: Test the "Event Emitters".
