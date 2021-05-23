import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { TextArea, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createArt } from "../../actions";
require('dotenv').config();

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

//! this form is used for art creation !//

const ArtForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [upload, setfile] = useState("");

  //sets the uploaded file in local state
  const getFile = (file) => {
    setfile(file);
  };

  //should be abstracted to .env
  const pinataSDK = require("@pinata/sdk");
  const pinata = pinataSDK(
    key,
    secret
  );

  const onSubmit = async (data) => {
    //!Stores uploaded image to IPFS and creates CID
    const IPFS = require("ipfs-core");
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(upload, {
      fidVersion: 1,
      hashAlg: "sha2-256",
    });

    //! art object data
    let art = {
      user_id: user.user.id,
      artist_id: user.user.artist.id,
      for_sale: false,
      caption: data.caption,
      category: data.category,
      name: data.name
    };

    //optional additions to Pin data
    const options = {
      pinataMetadata: {
        name: data.name,
        keyvalues: {
          description: `${data.caption}`,
          uploded_file: `${data.dropFile[0].path}`
        },
      },
    };

    //! Pins image via Pinata SDK - used to persist image CID on Pinata
    pinata
      .pinByHash(cid.string, options)
      .then((result) => {
        art = {
          ...art,
          link: `https://gateway.pinata.cloud/ipfs/${result.ipfsHash}`,
          cid: result.ipfsHash
        };

        dispatch(createArt({ art })).then(console.log);
      })
      .catch((err) => {
        console.log(err);
      });
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
                    type="submit"
                    disabled={Object.keys(values).length < 4}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Field>
            {/* <pre>{JSON.stringify(values)}</pre> */}
          </form>
        )}
      />
    </>
  );
};

export default ArtForm;
