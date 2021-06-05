import React from "react";

const ProfileArtCard = ({ nft }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="ui placeholder"> {nft}
          <div className="square image"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileArtCard;
