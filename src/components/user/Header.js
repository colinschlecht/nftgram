import React, { useState } from "react";
import PlaceholderExampleImage from "./PPPlaceHolder";

const Header = ({ user, self }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <PlaceholderExampleImage />
      {self && <button onClick={setEditing(!editing)}>Edit</button>}
      <h2>{user.username}</h2>
      <h5>{user.metamask_account}</h5>
      <div className="ui divider"></div>
      <p>{user.bio}</p>
      <div className="ui divider"></div>
    </>
  );
};

export default Header;
