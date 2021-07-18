import React from "react";
import { Image } from "semantic-ui-react";

const MetaMask = () => {
  return (
    <>
      <div className="docs article area">
        <h3 className="docs-text title">Why MetaMask?</h3>
        <p className="docs-text">
          MetaMask is a tried and true, developer, and more importantly USER
          friendly browser extension. It was an easy first choice for me in
          building NFTgram.
          <br></br>
          <br></br>
          Here is some documentation to istall from{" "}
          <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask">
            MetaMask's zen-desk
          </a>
          . For a more detailed look, be sure to check their docs out directly!
        </p>
        <p className="docs-text">
          Official website:{" "}
          <a href="https://metamask.io/">https://metamask.io/</a>
        </p>

        <h3 className="docs-text title">What is MetaMask?</h3>
        <p className="docs-text">
          "MetaMask is a web extension, which allows you to manage your Ethereum
          private keys via your web browser. By doing so, it serves as a wallet
          for Ether and ERC20 tokens, and allows you to visit the distributed
          web of tomorrow in your browser today. To be more specific, it allows
          you to run Ethereum dApps (Decentralized Apps) right in your browser
          without running a full Ethereum node. ( It means you don’t have to
          download and sync the full blockchain on your device/computer). Our
          mission is to make Ethereum as easy to use for as many people as
          possible.""
        </p>

        <h3 className="docs-text title">How to install MetaMask?</h3>
        <p className="docs-text">
          MetaMask is a pretty straight forward extension install. Follow the
          steps below or press on the caret in the left hand corer of the
          screen. If you don't already have it installed, metamask will redirect
          you to the appropriate extension store.
          <br></br>
          <br></br>
          PRO TIP: Save your mnemonic pass phrase in a secure location. You will
          likely use that more than once, and in the event that you are locked
          out of your account, future you will thank you.
          <br></br>
          <br></br>
          <h4 className="docs-text title">Chrome</h4>
          <ol>
            <li>
              Visit <a href="https://metamask.io/">https://metamask.io/</a>
            </li>
            <li>
              Click “Get Chrome Extension”. You will be directed to Chrome Web
              Store.
            </li>
            <li>Click “Add to Chrome”</li>
            <li> On the pop up, click “Add extension”</li>
          </ol>
        </p>
        <p className="docs-text">
          <h4 className="docs-text title">FireFox</h4>
          <ol>
            <li>
              Visit <a href="https://metamask.io/">https://metamask.io/</a>
            </li>
            <li>
              Click “Get FireFox Extension”. You will be directed to FireFox
              Add-Ons.
            </li>
            <li>Click “Add to FireFox”</li>
            <li>On the pop up, click “Add”</li>
          </ol>
        </p>
        <p className="docs-text">
          <h4 className="docs-text title">Brave</h4>
          <ol>
            <li>
              Visit <a href="https://metamask.io/">https://metamask.io/</a>
            </li>
            <li>
              Click “Get Brave Browser”. You will be directed to Brave website.
            </li>
            <li>Click “Download”. MetaMask is built in the browser.</li>
          </ol>
        </p>
        <br></br>
        <br></br>
        <h3 className="docs-text title">Interacting in NFTgram</h3>
        <p className="docs-text">
          <h6 className="docs-text title">Download or Connect</h6>
          To connect with MetaMask, press the Caret in the left hand side of the
          screen
          <br></br>
          <br></br>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/caret.png"
            alt="walk through for login"
            className="metamask-capture"
          ></Image>
        </p>
        <br></br>
        <br></br>
        <p className="docs-text">
          If the browser detects that you do not have MetaMask installed, you
          will need to click the button to install from the Extension store.
          <br></br>
          <br></br>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/Screen+Shot+2021-07-17+at+9.06.37+PM.png"
            alt="walk through for login"
            className="metamask-capture"
          ></Image>
        </p>
        <br></br>
        <br></br>
        <p className="docs-text">
          If you have MetaMask installed and you are logged in, press connect.
          <br></br>
          <br></br>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/connectbtn.png"
            alt="walk through for login"
            className="metamask-capture"
          ></Image>
        </p>
        <br></br>
        <br></br>
        <p className="docs-text">
          Once connected, you will recieve a notification, and the button will
          change to connected.
          <br></br>
          <br></br>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/connectedbtn.png"
            alt="walk through for login"
            className="metamask-capture"
          ></Image>
        </p>
        <br></br>
        <br></br>
        <p className="docs-text">
          You will also be able to verify you have logged in by pressing on the
          hamburger menu, to open the side bar displaying your profile.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/verviedacct.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          <h6 className="docs-text title">Connecting to NFTgram</h6>
          If you are logging in for the first time, or were disconnected for
          another reason, you will need to authorize a reconnect to NFTgram.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/disconnected.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          You will then be prompted to choose what accounts you would like to
          connect. If you have more than one account established, you are
          welcome to connect multiple. Please note - each account will be
          associated with a different NFTgram user at this time.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/reconnected.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          <h6 className="docs-text title">Switching Accounts</h6>
          If you have multiple accounts associated with NFTgram, you are able to
          switch accounts with ease by first pressing on the MetaMask logo in
          your browser extension area.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/pendingexited.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Next, click the beach ball looking icon in the right corner to open
          your list of accounts.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/connected.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Once you've selected your account, NFTgram will automatically log you
          in or create a new user associated with that account.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/changingaccounts.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          <h6 className="docs-text title">Transacting on NFTgram</h6>
          For any transaction involving the ethereum blockchain, MetaMask will
          automatically ask for confirmation once a sale, cancellation,
          purchase, or creation of an NFT is initiated. As depicted, initiating
          a transaction on the blockchain incurrs a small cost, known as gas.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/sending.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Transactions on the blockchain need to be verified, or mined. This
          takes time to complete, and sometimes the transaction will still fail.
          Unfortunatly, in this event you are not refunded on the cost of gas.
          <br></br>
          <br></br>
          Also note, you can check the status of your transaction on etherscan,
          even on the test-net! There will be a link inside the transaction
          notification to take you there.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/pending.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          If you exit out of the MetaMask window while a transaction is pending,
          you'll see a little blue icon indicating a pending transaction. Fear
          not! Reopening metamask will take you right back!
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/pendingexited.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          <h6 className="docs-text title">Additional Transactions</h6>
          In for longer processes, there may be additional promps inside of
          metamask due to multiple transactions actually needing to occur.
          <br></br>
          <br></br> If you find that you are waiting longer than 30 seconds,
          it's likely that there is an additional promt in NFTgram, MetaMask, or
          the transaction failed.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/confirm.png"
          alt="walk through for login"
          className="metamask-capture"
        ></Image>
      </div>
    </>
  );
};

export default MetaMask;
