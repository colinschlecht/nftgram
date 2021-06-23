import React /* useEffect, useState */ from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import PlaceholderExampleImage from "./PPPlaceHolder";
import { Icon } from "semantic-ui-react";
import CopyButton from "../header/copyButton";
// import { Grid, Image } from "semantic-ui-react";

const Header = ({ user }) => {
  const wallet = useSelector((state) => state.MetaMask);

  console.log(user)

  return (
    <>
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
        <h2>{user.username}</h2>
        <h5>{user.metamask_account}<CopyButton message={user.metamask_account}></CopyButton></h5>
        <div>
          {wallet.account === user.metamask_account ? (
            <Link className="edit icon" to="/">
            <Icon name="edit outline"></Icon>
            </Link>
          ) : null}
        </div>
        <div className="ui divider header"></div>
        <p>{user.bio}</p>
        <div className="ui divider header"></div>
      </div>
    </>
  );
};

export default Header;
