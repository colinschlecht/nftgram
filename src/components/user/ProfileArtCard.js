import React from "react";

const ProfileArtCard = ({ art }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="ui placeholder"> 
          <div className="square image"></div>
        </div>
        <h6>{art.caption}</h6>
      </div>
    </div>
  );
};

export default ProfileArtCard;
