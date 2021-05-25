###Description

nftgram is a virtual art gallery/social media platform, where a user can view and create virtual art.

NFT Smart Contract: https://rinkeby.etherscan.io/address/0x3032107eAcD70a6590b24A1FD8A53Ecf4E9c3692#code

User stories:

A user is required to create an account to interract with other users.
A user can create art, adding to the main explore view.
A user can like and comment on other art pieces.
A user can reply to comments and like comments.

ToDo:

Individual user show page.
Individual art show page.
List of users who have liked showpage.
User account settings.
Following capability.
Additional timelines.
Events tab on art.

Current NFT creation status: WIP
Updated 5/1/21

When creating art, a unique CID is created as it is uploaded to the IPFS.
In order to persist this upload to the IPFS the CID and artpiece is then pinned via pinning service: Pinata.
The response from pinning to pinata returns a pinata specific URI that points to the artpiece. 
The URI, along with the CID are then added to an art object, which contains the other art attributes defined by the user. This art object is passed via axios to the server in POST req, creating an art instance persisted to the db and added to the explore timeline.

ToDo:
*smart contract.
*metamask ui.
*minting capabilities.

## Available Scripts

In the project directory, you can run:
### `yarn start` 

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



