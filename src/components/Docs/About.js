import React from "react";

import { Icon } from "semantic-ui-react";

const About = () => {
  return (
    <>
      <div className="docs article area">
        <h3 className="docs-text title">The man behind the gram</h3>
        <p className="docs-text">
          Hi! I’m Colin - a recent graduate of Flatiron and passionate
          developer. I’m a local to the beautiful state of Washington, and a
          lover of all things tech and outdoors. If you're taking the time to
          read this, thank you for stoping by the site! You can check out my
          other work, contact and social media profiles in the links below, or
          send me a message via the non-existent contact form… I’ll get to that
          soon. ;p
        </p>

        <span>
          <a href="https://colinschlecht.info/" className="text-link">
            <Icon name="linkify" />
          </a>{" "}
          |{" "}
          <a href="https://github.com/colinschlecht" className="text-link">
            <Icon name="github square" />
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/colin-schlecht-390916a8/"
            className="text-link"
          >
            <Icon name="linkedin" />
          </a>{" "}
          |{" "}
          <a href="https://colinschlecht.medium.com/" className="text-link">
            <Icon name="medium" />
          </a>
          |{" "}
          <a href="https://twitter.com/colinthebigguns" className="text-link">
            <Icon name="twitter" />
          </a>
        </span>

        <h3 className="docs-text title">NFTgram / Inftagram / NFTgramIO</h3>
        <p className="docs-text">
          NFTgram - however you prefer to read it - is intended to offer you an
          easy way to show off your NFT collection, create NFTs, and even buy or
          sell NFTs without fees. Originally my capstone project for the
          Flatiron School of Software Engineering, the project is constantly
          under development and will continue to change.
          <br></br>
          <br></br>
          In its current state the site is purely experimental. You can create
          NFTs using the NFTgramIO NFT smart contract, create a sale using the
          NFTgram sale factory contract, and interact with the sale contract to
          cancel or buy an NFT for sale using *real* Ethereum. The NFT created
          can be uploaded to other NFT platforms such as OpenSea. However, the
          transactions are all exclusive to the Rinkeby test-net. At this time
          you cannot upload an NFT you already own from your crypto wallet or
          use the platform to create NFT’s using main-net Ethereum.
          <br></br>
          <br></br>
          This project was a combination of requirements to finish Flatiron’s
          curriculum and a desire to push my learning beyond those. It was my
          first dive into blockchain and redux which has proven to be a
          never-ending learning experience. If you would like to take the time
          to create an NFT but are unfamiliar with them, take a look at the
          "documentation" on NFTs, MetaMask, and Usage.
        </p>
        <h3 className="docs-text title">The Tech Behind the Gram</h3>
        <p className="docs-text">
          NFTgram is built with partial decentralization in mind. The back-end
          consists of a Ruby on Rails API to handle some of the lighter user
          interractions such as commenting on and liking art, the Ethereum
          blockchain for NFT creation, sales, and storage, and the
          Interplanetary File System (IPFS)/pinata to pin the user uploaded
          images and NFT metadata. The front-end is React/Redux, with sprinkles
          of assistance from numerous React, Redux, JavaScript and CSS
          libraries. The Journey to learning just enough blockchain to build
          this is brought by udemy, hours of reading blogs/forums, and the good
          people at Alchemy, Open Zeppelin, and MetaMask.
        </p>
        <h6 className="docs-text title">The Contracts Involved</h6>
        <p className="docs-text">
          There are two verified smart contracts associated with NFTgramIO. The{" "}
          <a href="https://rinkeby.etherscan.io/address/0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692#code">
            NFT Smart Contract
          </a>
          , and the{" "}
          <a href="https://rinkeby.etherscan.io/address/0xC46578d68C8e876E8f6FB4759bd679A3B256D3c5#code">
            SaleFactory Smart Contract
          </a>
          .<br></br>
          <br></br>
          The NFT smart contract is up to the official ERC-721 standard, as it
          is a published and very lightly modified version available through{" "}
          <a href="https://docs.openzeppelin.com/contracts/2.x/erc721">
            OpenZeppelin
          </a>
          .<br></br>
          <br></br>
          The Sale Factory smart contract is based on various online resources
          and available to examine on etherscan as well. The SaleFactory smart
          contract creates a Sale contract, which handles all the transactions
          regarding the transfer of token and ethereum for that particular sale.
          <br></br>
          <br></br>
          The original sale contract can be viewed on{" "}
          <a href="https://github.com/colinschlecht/nftgram/blob/master/contracts/Sales.sol">
            GitHub
          </a>
          , which displays the sale and salefactory as one whole contract.
          <br></br>
          <br></br>
        </p>
      </div>
    </>
  );
};

export default About;
