import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import PlaceholderExampleImage from "./PPPlaceHolder";
import {
  Icon,
  Segment,
  Divider,
  Form as UIForm,
  TextArea,
} from "semantic-ui-react";
import CopyButton from "../header/copyButton";
import { updateUser } from "../../actions";
import AvatarDrop from "./AvatarDrop";
import Linkify from "react-linkify"
// import { Grid, Image } from "semantic-ui-react";

require("dotenv").config();

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.MetaMask);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [name, setName] = useState(user.username || "");
  const [avatar, setAvatar] = useState(user.avatar);
  const [upload, setFile] = useState("");

  const [editingIMG, setEditingIMG] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  const pinataSDK = require("@pinata/sdk");
  const pinata = pinataSDK(key, secret);

  const getFile = (file) => {
    setFile(file);
  };

  const confirmAvatarChange = async (e) => {
    e.preventDefault();
    const IPFS = require("ipfs-core");
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(upload, {
      cidVersion: 1,
      hashAlg: "sha2-256",
    });
    pinata.pinByHash(cid.string);
    setAvatar(cid.string);
    setEditingIMG(false);
    await ipfs.stop();
  };

  const handleEditingChange = async (e) => {
    e.preventDefault();
    setEditing(!editing);
    if (editing) {
      setEditingIMG(false);
      setEditingName(false);
      setEditingBio(false);
      setBio(user.bio);
      setAvatar(user.avatar);
      setName(user.username);
    }
  };

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    const userFields = { bio, username: name, avatar };
    try {
      await dispatch(updateUser(user.id, userFields));
      setEditingIMG(false);
      setEditingName(false);
      setEditingBio(false);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setName(user.username);
    setBio(user.bio);
    setAvatar(user.avatar);
  }, [user]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Segment>
        <div className="profile-edit-button">
          {wallet.account === user.metamask_account ? (
            <a
              className="link-text"
              href="/edit-page"
              onClick={(e) => handleEditingChange(e)}
            >
              {editing ? (
                <Icon name="cancel"></Icon>
              ) : (
                <>
                  <Icon name="edit outline"></Icon>{" "}
                  <span className="edit-text">Edit</span>{" "}
                </>
              )}
            </a>
          ) : null}
        </div>
        <div className="edit-confirm">
          {editing && (
            <a
              id="edit-confirm-button"
              className="link-text"
              href="/edit-page"
              onClick={(e) => handleEditConfirm(e)}
            >
              <Icon name="check"></Icon>
            </a>
          )}
        </div>
        <div className="header container">
          <div>
            {editing &&
              (editingIMG ? (
                <>
                  <Icon
                    name="check"
                    className="edit-img-button confirm"
                    onClick={(e) => confirmAvatarChange(e)}
                  />
                  <Icon
                    name="cancel"
                    className="edit-img-button cancel edit"
                    onClick={() => setEditingIMG(!editingIMG)}
                  />
                </>
              ) : (
                <>
                  <Icon
                    name="edit outline"
                    className="edit-img-button"
                    onClick={() => setEditingIMG(!editingIMG)}
                  />
                </>
              ))}
          </div>
          <div className="image placeholder">
            {editingIMG ? (
              <Form
                onSubmit={(e) => onSubmit(e)}
                render={({
                  handleSubmit,
                  // form
                  // submitting,
                  // pristine,
                  // values,
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
                      user={user}
                      avatar={avatar}
                      name="dropFile"
                      component={AvatarDrop}
                    />
                  </form>
                )}
              />
            ) : user.avatar ? (
              <img
                alt={`${user.username}'s profile pic. Nice!`}
                className="ui small circular image avatar"
                // src={`https://gateway.pinata.cloud/ipfs/${avatar}`}
                src={`https://ipfs.io/ipfs/${avatar}`}
              ></img>
            ) : (
              <PlaceholderExampleImage />
            )}
          </div>
          <div id="profile-username-container">
            <div id="edit-name-button-placeholder">
              {editing && (
                <>
                  <Icon
                    name="edit outline"
                    className="edit-name-button"
                    onClick={() => setEditingName(!editingName)}
                  />
                </>
              )}
              <Divider className="edit-divider" />
            </div>
            <div className="profileusername-div">
              {editingName ? (
                <UIForm>
                  <UIForm.Input
                    id="edit-name-input"
                    className="name input form"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </UIForm>
              ) : (
                <h2 className="profileusername">{name}</h2>
              )}
              <Divider />
            </div>
          </div>
          <div id="profile-metamask-div">
            <h5>
              <CopyButton message={user.metamask_account}></CopyButton>
              {user.metamask_account}
            </h5>
          </div>
          <Divider />
          {editing && (
            <Icon
              name="edit outline"
              className="edit-bio-button"
              onClick={() => setEditingBio(!editingBio)}
            />
          )}
          <div className="profile bio area">
            <Linkify>
            {editingBio ? (
              <>
                <UIForm className="edit-bio">
                  <TextArea
                    placeholder={"Enter Bio"}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></TextArea>
                </UIForm>
              </>
            ) : (
              <p className="profile bio">{bio}</p>
            )}
            </Linkify>
          </div>
          <Divider />
        </div>
      </Segment>
    </>
  );
};

export default Header;
