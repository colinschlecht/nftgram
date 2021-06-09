import React from "react";
import { Image, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileArtCard = ({ art }) => {


const getDate = () => {
  let ms = (Date.now() - Date.parse(art.created_at)) / 1000 / 60 / 60 / 24 
  if(ms >= 1){
    return Math.floor(ms) + " days ago"
  } else {
    return (ms * 24) + " hours ago"
  }
}

// const date = art.created_at.split("T")[0]
  return (
    <Card>
      <Card.Content>
        <Link
          id={art.id}
          key={art.id + "u"}
          to={{ pathname: `/art/${art.id}` }}
        >
          <Image src={`https://ipfs.io/ipfs/${art.cid}`} fluid />
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
