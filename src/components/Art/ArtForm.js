import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { TextArea, Button, Input, Icon, Divider } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createArt, raiseAlert, lowerAlert, setDropped } from "../../actions";
import {
  mintNFT,
  checkTransactionStatus,
  getTokenId,
} from "../../utils/NFTInteract";

import { Link } from "react-router-dom"

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

  useEffect(() => {
    if(uploadStatus){
      dispatch(raiseAlert(uploadStatus))
      dispatch(lowerAlert())
    }
    }, [uploadStatus, dispatch])

  //sets the uploaded file in local state
  const getFile = (file) => {
    setfile(file);
  };
  console.log(wallet.account);

  const pinataSDK = require("@pinata/sdk");
  const pinata = pinataSDK(key, secret);

  const displayAccount = () => {
    const w = window.innerWidth;
    if (w < 560) {
      if (wallet.account) {
        return `${wallet.account.slice(0, 6)}.......${wallet.account.slice(
          30
        )}`;
      } else {
        return "Please connect MetaMask";
      }
    } else {
      if (wallet.account) {
        return `${wallet.account}`;
      } else {
        return "Please connect MetaMask";
      }
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
      const mintResponse = await mintNFT(`ipfs://${pinResponse.IpfsHash}`);

      let art;

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
                handleCancel(cid.string);
                setMessage(
                  `transaction ${mintResponse.transactionHash} unsuccessful`
                );
              } else {
                //! art object data for DB
                const tokenInfo = await getTokenId(
                  wallet.account,
                  `ipfs://${pinResponse.IpfsHash}`
                );
                art = {
                  user_id: user.id,
                  artist_id: user.id,
                  for_sale: false,
                  description: data.description,
                  caption: data.caption,
                  category: data.category,
                  name: data.name,
                  link: `https://gateway.pinata.cloud/ipfs/${pinResponse.IpfsHash}`,
                  cid: cid.string,
                  tokenURI: `ipfs://${pinResponse.IpfsHash}`,
                  contract_address: tokenInfo.address,
                  tokenID: tokenInfo.id,
                };
                if (art.tokenID) {
                  const post = await handlePost(art);
                  setLoading(false);
                  await ipfs.stop();
                  setStatus(post.status);
                  setMessage(post.message);
                }
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
            <Divider />
            <Field name="account">
              {(props) => (
                <>
                  <div id="outer-mm-input">
                    <a
                      id="link-text"
                      href="/sign-in"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Icon
                        name="ethereum"
                        onClick={() => dispatch(setDropped())}
                      />
                    </a>{" "}
                    <Input
                      value={displayAccount()}
                      disabled={true}
                      style={{ width: "100%" }}
                      id="metamask-input"
                    />{" "}
                  </div>
                </>
              )}
            </Field>
            <Divider />
            <div className="name-category">
              <Field name="name">
                {(props) => (
                  <>
                    <Input
                      id="art-upload-input"
                      value={props.input.value}
                      onChange={props.input.onChange}
                      placeholder={`Name...`}
                    />
                  </>
                )}
              </Field>

              <Field name="category">
                {(props) => (
                  <>
                    <Input
                      id="art-upload-input"
                      value={props.input.value}
                      onChange={props.input.onChange}
                      placeholder={`category...`}
                    />
                  </>
                )}
              </Field>
            </div>
            <Divider />
            <Field name="description">
              {(props) => (
                <>
                  <TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    id="upload-text-area"
                    placeholder={`Description...`}
                  />
                </>
              )}
            </Field>
            <Divider />
            <Field name="caption">
              {(props) => (
                <>
                  <TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    id="upload-text-area"
                    placeholder={`Caption...`}
                  />
                </>
              )}
            </Field>
            <Divider />
            <Field name="Submit">
              {(props) => (
                <>
                      {message === "Posted NFT to NFTgram!" ? null : <Button
                    loading={loading}
                    type="submit"
                    disabled={Object.keys(values).length < 5 || disabled}
                  >
                    Submit
                  </Button>}

                  
                </>
              )}
            </Field>
            
          </form>
        )}
      />
     <p>{message}</p> 
      {message === "Posted NFT to NFTgram!" ? <Link to="/"> <Button>View Post</Button> </Link>: null}
    </>
  );
};

export default ArtForm;
