import React from "react";
import PlaceholderExampleImage from "./PPPlaceHolder";

const Header = ({ user }) => {
  return (
    <>
      <PlaceholderExampleImage />
      <h2>{user.username}</h2>
      <h5>{user.metamask_account}</h5>
      <div className="ui divider"></div>
      <p>{user.bio}</p>
      <div className="ui divider"></div>
    </>
  );
};

export default Header;
