import React from "react";
import { Link } from "react-router-dom";

const ProfileArtCard = ({ art }) => {
  const getDate = () => {
    let ms = (Date.now() - Date.parse(art.created_at)) / 1000 / 60 / 60 / 24;
    if (ms >= 1) {
      return Math.floor(ms) + " days ago";
    } else if (ms * 24 >= 1) {
      return Math.floor(ms * 24) + " hours ago";
    } else if (ms * 24 < 1) {
      return Math.floor(ms * 24 * 60) + " minutes ago";
    }
  };

  return (
    <div className="ui card body">
      <div className="content">
        <Link
          id={art.id}
          key={art.id + "u"}
          to={{ pathname: `/art/show/${art.id}` }}
        >
          <div className="body image container">
            <img
              className="body art image"
              alt={art.description}
              src={`https://ipfs.io/ipfs/${art.cid}`}
            />
          </div>
        </Link>
        <div className="body text content"></div>
        <h5>{art.caption}</h5>
        <div className="meta">
          <span className="date">Posted {getDate()} </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileArtCard;
