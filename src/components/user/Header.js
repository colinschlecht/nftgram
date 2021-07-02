import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlaceholderExampleImage from "./PPPlaceHolder";
import { Icon, Segment, Divider, Form, TextArea } from "semantic-ui-react";
import CopyButton from "../header/copyButton";
import { updateUser } from "../../actions";
import AvatarDrop from "./AvatarDrop";
// import { Grid, Image } from "semantic-ui-react";

const Header = ({ user }) => {
const dispatch = useDispatch()

  const wallet = useSelector((state) => state.MetaMask);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [name, setName] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);

  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  const handleEditingChange = (e) => {
    e.preventDefault();
    setEditing(!editing);
    if(editing){
      setEditingName(false)
      setEditingBio(false)
      setBio(user.bio)
      setName(user.username)
    }
  };
  const handleEditConfirm = async (e) => {
    e.preventDefault();
    const userFields = { bio, username: name, avatar }
    try {
      const resp = await dispatch(updateUser(user.id, userFields))
      setEditingName(false)
      setEditingBio(false)
      setEditing(false);
      console.log(name)
      console.log(userFields)
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
 

    };

    console.log(user.id)

  useEffect(() => {
  setName(user.username)
  setBio(user.bio)
  setAvatar(user.avatar)
  }, [user])

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
          <div className="image placeholder">
            {user.avatar ? (
              <img
                alt={`${user.username}'s profile pic. Nice!`}
                className="ui small circular image"
                src={`https://ipfs.io/ipfs/${user.avatar}`}
              ></img>
            ) : (
              <PlaceholderExampleImage />
            )}
          </div>
          <div id="profile-username-container">
            {
              //!TODO: edit name, edit photo, form submit on checkmark
            }
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
              <Divider className="edit-divider"/>
            </div>
            <div className="profileusername-div"
>
            {editingName ? (
              <Form>
                  <Form.Input
                    id="edit-name-input"
                    className="name input form"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form>
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
            {editingBio ? (
              <>
                <Form className="edit-bio">
                  <TextArea
                    placeholder={"Enter Bio"}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></TextArea>
                </Form>
              </>
            ) : (
              <p className="profile bio">{bio}</p>
            )}
          </div>
          <Divider />
        </div>
      </Segment>
    </>
  );
};

export default Header;
