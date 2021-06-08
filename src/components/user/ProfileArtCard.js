import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileArtCard = ({ art }) => {
  return (
    <div className="ui card">
      <div className="content">
        <Link
          id={art.id}
          key={art.id + "u"}
          to={{ pathname: `/art/${art.id}`}}
        >
          <Image src={`https://ipfs.io/ipfs/${art.cid}`} fluid />
        </Link>
        <h6>{art.caption}</h6>
      </div>
    </div>
  );
};

export default ProfileArtCard;
