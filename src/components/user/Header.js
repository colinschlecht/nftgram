import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlaceholderExampleImage from "./PPPlaceHolder";

const Header = ({ user }) => {
  const wallet = useSelector((state) => state.MetaMask)

  console.log("hi")
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
