import React from "react";
import {
  Card,
  Image,
  // Icon
} from "semantic-ui-react";
import logo from "../../images/ethcam.svg";

const Reply = ({ reply, commentType, replyFor }) => {
  const getDate = () => {
    let ms = (Date.now() - Date.parse(reply.created_at)) / 1000 / 60 / 60 / 24;
    if (ms >= 1) {
      return Math.floor(ms) + " days ago";
    } else if (ms * 24 >= 1) {
      return Math.floor(ms * 24) + " hours ago";
    } else if (ms * 24 < 1) {
      return Math.floor(ms * 24 * 60) + " minutes ago";
    }
  };

  const userAvi = reply.user.avatar ? reply.user.avatar : logo;
  return (
    <>
      <Card className={`comment card ${commentType}`} id="comment-card">
        <Card.Content className="comment card userdiv">
          <Image src={userAvi} alt={reply.user?.username} avatar />
          <div className="comment card text-header">
            <span className="comment card username">{reply.user.username}</span>
            <div className="comment card metadata">
              <span>
                {getDate()}{" "}
                <span className="metadata username">
                  replying to @{replyFor}
                </span>
              </span>
            </div>
          </div>
        </Card.Content>
        <Card.Content>
          <Card.Description>{reply.comment}</Card.Description>
        </Card.Content>
        <Card.Content extra> </Card.Content>
      </Card>
   
      {reply.comments.map((replyreply) => (
          
        <Reply
          reply={replyreply}
          key={`reply ${replyreply.id} to reply ${reply.id}`}
          commentType="replyreply"
          replyFor={reply.user.username}
        />
      ))}
    </>
  );
};

export default Reply;
