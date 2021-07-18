import React from "react";
import { Image } from "semantic-ui-react";

const Useage = () => {
  return (
    <>
      <div className="docs article area">
        <h6 className="docs-text title">
          Basic Interactions - MetaMask and Nav
        </h6>
        <p className="docs-text">
          There are two UI buttons to be aware of. The Caret in the left, and
          the Hamburger to the right. If you're reading this now, you've already
          found the hamburger menu at least once!
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
          The hamburger menu is how you will navigate the site, reaching the
          main "explore" timeline, your account, posting form, and
          documentation.
          <br></br>
          <br></br>
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/full+menu.png"
          alt="walk through for login"
          className="metamask-capture small"
        ></Image>
        <br></br>
        <br></br>
        <h3 className="docs-text title">Profile Interactions</h3>
        <p className="docs-text">
          You may be wondering how to change your goofy auto-generated name,
          update your slightly lopsided default picture, or add a little spice
          to your profile with a bio.
        </p>
        <br></br>
        <br></br>
        <p className="docs-text">
          After logging in, navigate to your profile through the hamburger menu.
          Once there, you'll notice an edit button in the left corner of the
          profile header (this will only appear if you are logged in).
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/Edit+button.png"
          alt="walk through for login"
          className="metamask-capture medium"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Click this button, and select the item you wish to edit. Note - if you
          are replacing your photo, you'll need to confirm the photo change by
          clicking the smaller check mark to the right of the photo.
        </p>
        <div className="group-of-3">
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/click+to+confirm.png"
            alt="walk through for login"
            className="metamask-capture small"
          ></Image>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/editing.png"
            alt="walk through for login"
            className="metamask-capture small"
          ></Image>
        </div>
        <br></br>
        <br></br>
        <p className="docs-text">
          Continue editing the profile by selecting the desired element. Once
          you are done editing, you can either confirm the changes or cancel
          using the far right check mark, or far left x, respectively.
        </p>
        <br></br>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/Screen+Shot+2021-07-18+at+2.13.50+AM.png"
          alt="walk through for login"
          className="metamask-capture medium"
        ></Image>
        <br></br>
        <br></br>
        <h3 className="docs-text title">Ethereum Interactions</h3>
        <p className="docs-text">
          First and Foremost - In order to use NFTgram to interact with the
          Ethereum blockchain you will need to have some Ethereum. If you don't
          already have MetaMask installed, be sure to check out the MetaMask
          docs just to the left before heading to the faucet below.
          <br></br>
          <br></br>
          With social media, you can get some Rinkeby test-net Ethereum pretty
          easily by following the steps on the{" "}
          <a href="https://faucet.rinkeby.io/">Rinkeby Faucet</a>.
        </p>
        <h3 className="docs-text title">Creating</h3>
        <p className="docs-text">
          It's time to create some art! This part is on you. NFTgram currently
          supports images and GIFs. Once that part is taken care of, select the
          camera button in the hamburger menu to navigate to the posting form.
          <br></br>
          <br></br>
          Once filled out - click submit, answer the subsequent MetaMask
          prompts, and kick back while your NFT is minted!
        </p>
        <div className="side-by-side">
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/new+post.png"
            alt="walk through for login"
            className="metamask-capture small"
          ></Image>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/posting.png"
            alt="walk through for login"
            className="metamask-capture small"
          ></Image>
          <br></br>
          <br></br>
        </div>
        <h3 className="docs-text title">Selling</h3>
        <p className="docs-text">
          Placing an NFT for sale is just as straight-forward. Navigate to the
          NFT's show page by selecting the image from your profile, or as an
          option on the art card on the explore page.
          <br></br>
          <br></br>
          Note that if you're not logged in you won't have the option to create
          the listing.
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/create+listing.png"
          alt="walk through for login"
          className="metamask-capture small"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Click the shopping cart or ETH logo to initiate the sale. Click the
          green check-mark, and confirm the next MetaMask prompt. At this point,
          the NFT contract is granting the sale contract permission to interract
          on your behalf.
          <br></br>
          <br></br>
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/confirm+permission.png"
          alt="walk through for login"
          className="metamask-capture small"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          There is one final confirmation from NFTgram and a MetaMask prompt
          that facilitates the confirmation of the sale.
          <br></br>
          <br></br>
        </p>
        <div className="group-of-3">
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/final+confirm.png"
            alt="walk through for login"
            className="metamask-capture  small"
          ></Image>
          <Image
            src="https://nftgramio.s3.amazonaws.com/usagepics/confirm-sale.png"
            alt="walk through for login"
            className="metamask-capture  small"
          ></Image>
        </div>
        <h3 className="docs-text title">Cancelling</h3>
        <p className="docs-text">
          Even easier yet - is the cancellation procedure. Note that if you're
          not logged in you won't have the option to cancel the listing. Just as
          before, press the shopping cart or Ethereum logo to initiate.
        </p>
        <br></br>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/acancel.png"
          alt="walk through for login"
          className="metamask-capture medium"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Click the green check mark, and then answer the prompts from MetaMask.
          The cancellation should be completed in about 15 seconds.
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/acancelrequest.png"
          alt="walk through for login"
          className="metamask-capture small"
        ></Image>
        <br></br>
        <br></br>
        <h3 className="docs-text title">Buying</h3>
        <p className="docs-text">
          At this point, you're a pro at creating and selling. Time to do some
          shopping with all that money you've made! The buttons will be
          familiar, however the color has changed to indicate the NFT can be
          purchased.
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/createpurchase.png"
          alt="walk through for login"
          className="metamask-capture medium"
        ></Image>
        <br></br>
        <br></br>
        <p className="docs-text">
          Note - if you are not logged in you will still see that the NFT is for
          sale, you will not however be able to make a purchase. After
          confirming you're logged in, follow the same steps as cancellation to
          purchase the NFT.
        </p>
        <Image
          src="https://nftgramio.s3.amazonaws.com/usagepics/confpurchase.png"
          alt="walk through for login"
          className="metamask-capture small"
        ></Image>
        <br></br>
        <br></br>

      </div>
    </>
  );
};

export default Useage;
