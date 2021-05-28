import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { TextArea, Button, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createArt } from "../../actions";
import { mintNFT, checkTransactionStatus } from "../../utils/interact";

require("dotenv").config();

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

//! this form is used for art creation !//

const ArtForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const wallet = useSelector((state) => state.MetaMask);
  const [upload, setfile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadStatus, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //sets the uploaded file in local state
  const getFile = (file) => {
    setfile(file);
  };

  const pinataSDK = require("@pinata/sdk");
  const pinata = pinataSDK(key, secret);

  const displayAccount = () => {
    if (wallet.account) {
      return `ETH account: ${wallet.account}`;
    } else {
      return "Please connect MetaMask";
    }
  };

  const handlePost = async (art) => {
    setStatus("NFT Minted, Posting...");
    try {
      dispatch(createArt({ art }));
      console.log("posted");
      return {
        success: true,
        message: "Posted NFT to NFTgram!",
        status: "Posted",
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong: " + error.message,
        status: "Error",
      };
    }
  };

  const handleCancel = async (hash) => {
    const resp = await pinata.unpin(hash);
    setStatus("Cancelled");
    setLoading(false);
    setDisabled(false);
    return resp;
  };

  //!Submits data for pinning, minting, posting.
  const onSubmit = async (data) => {
    setMessage("");
    //hard stop if mismatched accounts.
    if (window.ethereum.selectedAddress !== wallet.account) {
      setMessage("Ensure MetaMask account matches with selected address.");
      return {
        message:
          "Error: Selected address does not match internally selected MetaMask account",
      };
    } else {
      setDisabled(true);
      setLoading(true);
      setStatus("pinning");

      //!Stores uploaded image to IPFS and creates CID
      const IPFS = require("ipfs-core");
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(upload, {
        cidVersion: 1,
        hashAlg: "sha2-256",
      });

      //! art object data for DB
      let art = {
        user_id: user.user.id,
        artist_id: user.user.artist.id,
        for_sale: false,
        caption: data.caption,
        category: data.category,
        name: data.name,
        link: `https://gateway.pinata.cloud/ipfs/${cid.string}`,
        cid: cid.string,
      };

      //! NFT metadata
      const body = {
        name: data.name,
        image: `ipfs://${cid.string}`,
        description: `${data.caption}`,
      };
      //! NFT metadata if pin by hash
      const options = {
        pinataMetadata: {
          ...body,
        },
      };

      pinata.pinByHash(cid.string, options);

      //! Pins image via Pinata SDK - used to persist image CID, & NFT Metadata on Pinata
      const pinResponse = await pinata.pinJSONToIPFS(body);
      console.log(pinResponse);

      //! call to mint the NFT
      const mintResponse = await mintNFT(
        `ipfs://${pinResponse.IpfsHash}`
        // `https://gateway.pinata.cloud/ipfs/${pinResponse.IpfsHash}`
      );

        if (!mintResponse.success) {
          await ipfs.stop();
          setMessage(mintResponse.message);
          handleCancel(pinResponse.IpfsHash);
          handleCancel(cid.string);
          return null;
        } else {
          setStatus("Minting NFT");
        }

        //! checks status via web3 interaction, if successfully minted post is made to DB
        const checkMine = () => {
          checkTransactionStatus(mintResponse.transactionHash).then(
            async (resp) => {
              if (!resp) {
                window.setTimeout(async () => {
                checkMine();
                }, 4000);
              } else {
                if (!resp.status) {
                  setStatus("Error");
                  handleCancel(pinResponse.IpfsHash);
                  handleCancel(cid.string)
                  setMessage(
                    `transaction ${mintResponse.transactionHash} unsuccessful`
                  );
                } else {
                  const post = await handlePost(art);
                  setLoading(false);
                  await ipfs.stop();
                  setStatus(post.status);
                  setMessage(post.message);
                }
              }
            }
          );
        };
        checkMine();
    }
  };

  return (
    <>
      <Form
        onSubmit={(e) => onSubmit(e)}
        render={({
          handleSubmit,
          // form,
          // submitting,
          // pristine,
          values,
          // initialValuesEqual,
          // reset,
        }) => (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="ui form error"
          >
            <Field
              getFile={(data) => getFile(data)}
              name="dropFile"
              component={Dropzone}
            />

            <Field name="account">
              {(props) => (
                <>
                  <Input
                    value={displayAccount()}
                    disabled={true}
                    style={{ width: "100%" }}
                  />
                </>
              )}
            </Field>
            <Field name="name">
              {(props) => (
                <>
                  <TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={`Name...`}
                  />
                </>
              )}
            </Field>
            <Field name="caption">
              {(props) => (
                <>
                  <TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={`Caption...`}
                  />
                </>
              )}
            </Field>
            <Field name="category">
              {(props) => (
                <>
                  <TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={`category...`}
                  />
                  <Button
                    loading={loading}
                    type="submit"
                    disabled={Object.keys(values).length < 4 || disabled}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Field>
            {uploadStatus}
            {/* <pre>{JSON.stringify(values)}</pre> */}
          </form>
        )}
      />
      {message}
    </>
  );
};

export default ArtForm;
