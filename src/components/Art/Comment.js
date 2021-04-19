import React, { useState } from "react";
import { Comment as Comm, Icon } from "semantic-ui-react";
import { CommentForm } from "./CommentForm";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../actions";


export const Comment = ({ comment, props }) => {

  const dispatch = useDispatch();
  const [thisComment, setThisComment] = useState(comment);
  const [replyClick, setReplyClick] = useState(false);
  const user = useSelector((state) => state.auth.user.user);

  
  //!POLYMORPHIC COMMENT REPLY /////
  //handles clicking of reply icon
  const handleReplyClick = (e) => {
    e.preventDefault();
    setReplyClick(!replyClick);
  };
  //handles comment reply submission
  const onSubmit = (formValues) => {

  dispatch(createComment({
      ...formValues,
      user_id: user.id,
      commentable_id: comment.id,
      commentable_type: "Comment"
    }) 
  )}

  //! ////////////////////////////////

  return (
      <Comm>
        <Comm.Content>
          <Comm.Author className="explore art card username" as="a">
            {thisComment.user.username}
          </Comm.Author>
          &nbsp;&nbsp;
          <span className="comment text">{thisComment.comment}</span>
          <Icon name="like" id="small-like-btn" />
          <Comm.Actions>
            <a href="/" onClick={(e) => handleReplyClick(e)}>
              Reply
            </a>
            <a href="/" onClick={(e) => props.handleExpandClick(e)}>{thisComment.comments.length}</a>
            {replyClick && <CommentForm comment={thisComment} commentType={"Comment Reply"} onSubmit={onSubmit}/>}
          </Comm.Actions>
        </Comm.Content>
      </Comm>
  );
};

///iterate through comment comments