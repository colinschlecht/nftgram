import React from "react";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  return (
    <div>
      {comment.comment}
      {comment.comments.map((reply) => (
        <Reply
          reply={reply}
          key={`reply ${reply.id} to comment ${comment.id}`}
        />
      ))}
    </div>
  );
};

export default Comment;
