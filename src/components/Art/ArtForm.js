import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { TextArea, Button, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createArt } from "../../actions";
import { mintNFT } from "../../utils/interact"
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
            setStatus("pinned");
            break;
          case "prechecking":
            window.setTimeout(async () => {
              await checkStatus();
            }, 3000);
            break;
          default:
            let error = {
              response: resp.rows[0].status,
              message: "Unable to pin to IFPS.",
            };
            setStatus("ERROR");
            setLoading(false);
            setMessage({ error });
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
      setLoading(true);
      setStatus("pinning");

      //!Stores uploaded image to IPFS and creates CID
      const IPFS = require("ipfs-core");
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(upload, {
        cidVersion: 1,
        hashAlg: "sha2-256",
      });

      console.log(cid.string)

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
      const options = {
        name: data.name,
        description: `${data.caption}`,
        image: `ifps://${cid.string}`,
      };
      //! Pins image via Pinata SDK - used to persist image CID on Pinata
      await pinata
        .pinByHash(cid.string, options)
        .then(async (result) => {
          art = {
            ...art,
            link: `https://gateway.pinata.cloud/ipfs/${result.ipfsHash}`,
            cid: result.ipfsHash,
          };
          console.log(result)
          await checkStatus(cid.string);
          const { status } = await mintNFT(`ifps://${cid.string}`);
          console.log(status)
          setMessage(status.message);
          //call mint nft, if successful, THEN add to db. if Error, delete pin.
          // dispatch(createArt({ art })).then(console.log);
        })
        .catch((err) => {
          console.log(err);
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
                    disabled={Object.keys(values).length < 4}
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
