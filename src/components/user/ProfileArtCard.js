import React from "react";
import { Image, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileArtCard = ({ art }) => {


const getDate = () => {
  let ms = (Date.now() - Date.parse(art.created_at)) / 1000 / 60 / 60 / 24 
  if(ms >= 1){
    return Math.floor(ms) + " days ago"
  } else if(ms * 24 >= 1){
    return Math.floor(ms * 24) + " hours ago"
  } else if(ms * 24 < 1) {
    return Math.floor(ms * 24 * 60) + " minutes ago"
  }
}

// const date = art.created_at.split("T")[0]
  return (
    <Card>
      <Card.Content>
        <Link
          id={art.id}
          key={art.id + "u"}
          to={{ pathname: `/art/show/${art.id}` }}
        >
          <Image alat={art.description} src={`https://ipfs.io/ipfs/${art.cid}`} fluid />
        </Link>
        <h5>{art.caption}</h5>
        <Card.Meta>
        <span className='date'>Posted {getDate()} </span>
      </Card.Meta>
      </Card.Content>
      </Card>
  );
};

export default ProfileArtCard;
