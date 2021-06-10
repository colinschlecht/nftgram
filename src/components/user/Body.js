import React from "react";
import ProfileArtCard from "./ProfileArtCard";

const Body = ({ user }) => {
  return (
    <div className="outer body container">
      <div className="body container">
        {user.arts
          ? user.arts.map((art) => <ProfileArtCard key={art.id} art={art} />)
          : null}
      </div>
    </div>
  );
};

export default Body;
