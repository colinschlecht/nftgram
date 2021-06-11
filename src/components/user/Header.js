import React, {/* useEffect, useState */} from "react";
import { useSelector } from "react-redux";
import PlaceholderExampleImage from "./PPPlaceHolder";
// import { Grid, Image } from "semantic-ui-react";

const Header = ({ user }) => {
  const wallet = useSelector((state) => state.MetaMask);

  console.log("hi");
  return (
    <>
      <div className="header container">
        <img alt={`${user.username}'s profile pic. Nice!`} className="ui small circular image"></img>
        <div className="image placeholder">
          <PlaceholderExampleImage />
        </div>
        <h2>{user.username}</h2>
        <h5>{user.metamask_account}</h5>
        <div>
          {wallet.account === user.metamask_account ? <button>Edit</button> : null}
        </div>
        <div className="ui divider header"></div>
        <p>{user.bio}</p>
        <div className="ui divider header"></div>
      </div>
    </>
  );
};

export default Header;
