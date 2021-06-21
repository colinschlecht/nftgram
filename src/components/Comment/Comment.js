import React from "react";
import Reply from "./Reply";
import { 
  Card, 
  Image, 
  // Icon 
} from "semantic-ui-react";
import logo from "../../images/ethcam.svg";

const Comment = ({ comment }) => {
  const userAvi = comment.user.avatar ? comment.user.avatar : logo;

  const getDate = () => {
    let ms =
      (Date.now() - Date.parse(comment.created_at)) / 1000 / 60 / 60 / 24;
    if (ms >= 1) {
      return Math.floor(ms) + " days ago";
    } else if (ms * 24 >= 1) {
      return Math.floor(ms * 24) + " hours ago";
    } else if (ms * 24 < 1) {
      return Math.floor(ms * 24 * 60) + " minutes ago";
    }
  };
  return (
    <>
      <Card className="comment card">
        <Card.Content className="comment card userdiv">
          <Image src={userAvi} alt={comment.user?.username} avatar />
          <div className="comment card text-header">
            <span className="comment card username">
              {comment.user.username}
            </span>
            <span className="comment card metadata">{getDate()}</span>
          </div>
        </Card.Content>
        <Card.Content>
        <Card.Description>{comment.comment}</Card.Description>

        </Card.Content>
        <Card.Content extra> </Card.Content>
      </Card>
      {comment.comments.map((reply) => (
        <Reply
          reply={reply}
          key={`reply ${reply.id} to comment ${comment.id}`}
        />
      ))}
    </>
  );
};

export default Comment;
