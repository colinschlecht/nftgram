import React from "react";
import LikeCard from "../Like/LikeCard";
import { Header, Segment} from "semantic-ui-react";

const ShowLikes = ({ art }) => {
  return (
    <div className="artshow details">
      <Header as="h4" attached="top" className="artshow detail title" block>
        Likers
      </Header>
      <Segment attached className="likes background">
        {art.likes.map((like) => (
          <LikeCard key={like.id} like={like} />
        ))}
      </Segment>
      <Header as="h4" attached="bottom" className="artshow detail title" block>
        <span className="cartspan salemessage">hide</span>
      </Header>

    </div>
  );
};
export default ShowLikes;
