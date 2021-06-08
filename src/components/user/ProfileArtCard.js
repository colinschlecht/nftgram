import React from "react";

const ProfileArtCard = ({ art }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="ui placeholder"> {art.caption}
          <div className="square image"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileArtCard;
