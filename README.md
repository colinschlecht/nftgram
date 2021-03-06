# NFTgramIO

### Description

NFTgramIO is a virtual art gallery/social media platform, where a user can view and create and trade virtual art.
## User stories:

* A user is required to 'create an account' to interract with other users, by connecting their MetaMask account. 
* A user account is singular, and can only be accessed via the user's MetaMask wallet. If a user has more than one MetaMask address and connects to NFTgramIO - they will generate another account.
* A user can mint an NFT in app on the ethereum blockchain, adding it to the explore view and the user's MetaMask wallet.
* A user can like and comment on other art pieces.
* A user can reply to comments and like comments.

## Creating an NFT:

When creating art, a unique Content Identifier - CID - is created as it is uploaded to IPFS for decentralized storage. The URI, along with the CID are also added to an art object, which contains the other art attributes defined by the user. 

In order to persist to IPFS the uploaded asset is pinned via pinning service: Pinata. Once pinned, the CID, name and description are also pinned as a JSON object separately. The response from pinning to pinata once again contains the pinata URI, which is used as the token URI in the minting process.

Using a standard ERC-721 smart contract, the token is minted. Once complete - if successful - The art object described earlier is passed via axios to the server in a POST req, creating an art instance persisted to the db and added to the explore timeline.

## Selling/Buying an NFT

A user can buy and sell NFT's for Ethereum by clicking on the ethereum tag or shopping cart on the show page of their NFT.

* NFT Smart Contract: https://rinkeby.etherscan.io/address/0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692#code


https://rinkeby.etherscan.io/address/0xC46578d68C8e876E8f6FB4759bd679A3B256D3c5#code

### ToDo:

Further decentralization.
User account settings.
Following capability.
Additional timelines.
Events tab on art.
Improve user Showpage.
Sales page.
User sales page.

### NFT ToDo:

* add NFT from wallet* WIP - currently able to use etherscan API to check address for ERC721 transfers
* wire up sales and sale factory so users can buy/sell

-------------------------------------------------------
## Bug squashing! 

* <s>  When switching MM accounts after liking a comment, if you click the same like button with another account the app crashes. Potential cause: "liked" state isn't updating on user swap, unless a re-render occurs. </s>

-------------------------------------------------------
## Further Decentralization WIP

In order to further Decentralize, there are certain aspects about NFTgramIO that require updating:

1. User profile
    <s>- User privacy/security are important. Currently NFTgramIO authorizes and authenticates users on the server side, using JWT. Metamask is NOT stored in the database, meaning a user has to have an account separate from signingin with metamask.</s> 

    Currently NFTgramIO authorizes and authenticates users through their Metamask login. A user cannot access another user's Metamask account without knowing their password / seed phrase, therefore cannot login as anyone but themself. Currently, user info is still stored in the DB. 


    Potential Solutions:
    * decentralized database, using IPFS or ORBITDB below
    * refined user record. user login is handled 100% through metamask. each MM acct will be associated to a user obj:
user = {
    t.string "metamask_account"
    t.string "username"
    t.string "bio"
    t.string "avatar"
}

        Changing accounts will change the object. but a user can still list associated aliases or affiliations. 

2. Art Pieces
    - An Art Piece is currently a centralized database record that points to an NFT stored on the blockchain. Comments/Likes are not stored with the NFT, even when created on NFTgramIO. NFT's created elsewhere will also not have this data stored.

    Potential Solutions:
    * decentralized database, using IPFS or ORBITDB below

3. Art Interaction
    - The biggest challenge in balancing user experience will be comments and likes. In order to create a like or comment an interraction on the blockchain would need to occur, resulting in gas expenses.

    Potential Solutions:
    * decentralized database, using IPFS or ORBITDB below

### potential tools: 

- IPFS
https://docs.ipfs.io/how-to/websites-on-ipfs/single-page-website/
https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_C

- ORBITDB
https://github.com/orbitdb/orbit-db

- case study read:
http://ltu.diva-portal.org/smash/get/diva2:1510141/FULLTEXT01.pdf










------
<!-- #### Available Scripts

In the project directory, you can run:
#### `yarn start` 

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->



