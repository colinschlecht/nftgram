import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { TextArea, Button, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createArt } from "../../actions";
import { mintNFT, checkTransactionStatus } from "../../utils/interact";
// import {getTransactionStatus} from "../../api/etherscan"

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

  const checkStatus = async (hash) =>
    await pinata.pinJobs(hash).then((resp) => {
      if (resp.rows.length) {
        switch (resp.rows[0].status) {
          case "searching":
            console.log("pinned")
            setStatus("pinned");
            break;
          case "prechecking":
            console.log("pre-checking")
            window.setTimeout(async () => {
              await checkStatus(hash);
            }, 3000);
            break;
          default:
            let error = {
              response: resp.rows[0].status,
              message: "Unable to pin to IFPS.",
            };
            console.log(resp)
            setStatus("ERROR");
            setLoading(false);
            setMessage( error.message );
            break;
        }
      } else {
        window.setTimeout(async () => {
          await checkStatus(hash);
        }, 3000);
      }
    });

  const onSubmit = async (data) => {
    //entire onsubmit is wrapped in this if statement
    if (window.ethereum.selectedAddress !== wallet.account) {
      return {
        message:
          "Error: Selected address does not match internally selected MetaMask account",
      };
    } else {
      setDisabled(true)
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
      };

      //! NFT metadata
      const body = new Object();
      body.name = data.name;
      body.image = `ipfs://${cid.string}`;
      body.description = `${data.caption}`;
      //may add in description field and make caption body.caption

      //! Pins image via Pinata SDK - used to persist image CID on Pinata
      await pinata
        .pinJSONToIPFS(body)
        .then(async (result) => {
          art = {
            ...art,
            link: `https://gateway.pinata.cloud/ipfs/${cid.string}`,
            cid: cid.string,
            // pin: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
          };
          window.setTimeout(async () => {
            await checkStatus(cid.string);
          }, 3000);
          //optomistically minting NFT
          setStatus("Minting NFT");
          await mintNFT(
            `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
          ).then((mintResp) => {
            //etherscan api to check transaction status
            window.setTimeout(async() => {
              console.log(mintResp.transactionHash)
              await checkTransactionStatus(mintResp.transactionHash)
            }, 3000);
          });
          console.log("minted")//!
          setStatus("NFT Minted");
          dispatch(createArt({ art })).then((dbResp) => {
            console.log(dbResp);//!
            setLoading(false);
            setStatus("Posted!");
          });
        })
        .catch((err) => {
          console.log(err);
          setDisabled(false)
        });
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
          pristine,
          values,
          initialValuesEqual,
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
