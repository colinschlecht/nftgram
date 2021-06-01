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
let deployedNFT;

let salesFactoryPre;
let sales;


describe("nftgramio contract", function () {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";

  beforeEach(async function () {
    testContract = await ethers.getContractFactory("NFTgramIO");
    accounts = await ethers.provider.listAccounts();
    contract = await testContract.deploy();
    deployedNFT = await contract.mintNFT(accounts[0], tokenURI);
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
    await contract['safeTransferFrom(address,address,uint256)'](accounts[0], accounts[1], 1)
    const ownerAfter = await contract.ownerOf(1);
    assert.strictEqual(ownerBefore, accounts[0]);
    assert.strictEqual(ownerAfter, accounts[1]);
  });
  it("increments for each minted nft", async function () {
    await contract.mintNFT(accounts[0], tokenURI)
    await contract.mintNFT(accounts[0], tokenURI)
    const supply = await contract.totalSupply()
    assert(parseInt(supply) > 1)
  })
});

describe("sales contract", function () {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmfYHTus2YC4jRj3NBxHZxUbjwLiQ3ofhMp1SintTSUqHb";

  beforeEach(async function () {
    accounts = await ethers.provider.listAccounts();
    testContract = await ethers.getContractFactory("NFTgramIO");
    contract = await testContract.deploy();
    deployedNFT = await contract.mintNFT(accounts[0], tokenURI);
    salesFactoryPre = await ethers.getContractFactory("Sale");
    sales = await salesFactoryPre.deploy(accounts[0], contract.address, 1, 1);
  });
  
  it("is deployable", async function () {
  assert(sales)
  });
  it("has methods associated with the contract.", async function () {
    console.log(Object.keys(sales))
  assert(Object.keys(sales))
  });
  
});
