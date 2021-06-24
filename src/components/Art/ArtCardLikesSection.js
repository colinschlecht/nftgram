import React from "react";
import { Segment } from "semantic-ui-react";

import LikeCard from "../Like/LikeCard";

const oddOrEven = (index) => (index % 2 === 0 ? "even" : "odd");


const ArtCardLikesSection = ({ art }) => {
  return (
    <>
      <Segment attached="top" className="comment section top">
      <span id="link-text"> Likes</span>

       
      </Segment>
      <div className="explore art card comment holder">
        {art.likes.map((like, index) => (
          <Segment
            className={`comment-${oddOrEven(index)}`}
            key={like.id}
            attached
          >
            <LikeCard
              id={index}
              location="explore art card"
              key={`a${art.id}l${like.id}`}
              like={like}
            />
          </Segment>
        ))}
      </div>
      <Segment attached="bottom" className="comment section bottom">
        <span id="link-text">Viewing all {art.likes.length} Likers</span>
      </Segment>
    </>
  );
};

export default ArtCardLikesSection;
