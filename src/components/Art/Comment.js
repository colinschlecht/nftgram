import React, { useState } from "react";
import { Comment as Comm, Icon } from "semantic-ui-react";
import { CommentForm } from "./CommentForm";
import { useSelector, useDispatch } from "react-redux";
import {
  createCommentComment,
  createCommentLike,
  destroyCommentLike,
} from "../../actions";

export const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [replyClick, setReplyClick] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.auth.user.user);

  // lass UserCreate extends React.Component {

  //!POLYMORPHIC COMMENT REPLY /////
  //handles clicking of reply icon
  const handleReplyClick = (e) => {
    e.preventDefault();
    setReplyClick(!replyClick);
    setExpanded(!expanded);
  };

  //handles comment reply submission
  const onSubmit = (formValues) => {
    dispatch(
      createCommentComment({
        ...formValues,
        user_id: user.id,
        commentable_id: comment.id,
        commentable_type: "Comment",
      })
    ).then(console.log);
  };
  //!\////////////////////////////

  //!\//// like a comment /////////
  const handleLike = (e) => {
    e.preventDefault();
    if (!liked) {
      setLiked(!liked);
      dispatch(
        createCommentLike({
          user_id: user.id,
          likeable_type: "Comment",
          likeable_id: comment.id,
        })
      );
    } else {
      setLiked(!liked);
      let disLikedComment = comment.likes.find((like) => like.user_id === user.id);
      console.log(disLikedComment);
      dispatch(destroyCommentLike(disLikedComment.id, disLikedComment));
    }
  };
  //!\////////////////////////////

    //!\///////// select a user profile or list /////////////
    const handleUserClick = (e) => {
      e.preventDefault();
      //pull up the selected user profile
    };
  
    const handleLikeCountClick = (e) => {
      e.preventDefault();
      //pull up all users who liked
    };
    //!\///////////////////////////////////////////////

  return (
    <Comm>
      <Comm.Content>
        <Comm.Author className="explore art card username" as="a"  onClick={(e) => handleUserClick(e)}>
          {comment.user.username}
        </Comm.Author>
        &nbsp;&nbsp;
        <span className="comment text">{comment.comment}</span>
        <a href="/" className="like button icon" onClick={(e) => handleLike(e)}>
          <Icon name="fire" id="small-like-btn" />
        </a>
        <Comm.Actions>
          <a href="/" onClick={(e) => handleReplyClick(e)}>
            Reply
          </a>
          <a href="/" id="small-like-count"  onClick={(e) => handleLikeCountClick(e)}> {comment.likes.length} likes</a>
          {comment.comments.length !== 1 ? (
            <a id="reply-count" href="/" onClick={(e) => handleReplyClick(e)}>
              {comment.comments.length} Replies
            </a>
          ) : (
            <a id="reply-count" href="/" onClick={(e) => handleReplyClick(e)}>
              {comment.comments.length} Reply
            </a>
          )}
          {replyClick ? (
            <>
              {comment.comments.map((com) => (
                <div id="comment-reply">
                  <Comment comment={com} key={com.id} />
                </div>
              ))}
              <CommentForm
                comment={comment}
                commentType={"Comment Reply"}
                onSubmit={onSubmit}
              />
            </>
          ) : null}
        </Comm.Actions>
      </Comm.Content>
    </Comm>
  );
};

///iterate through comment comments
// {comment.comments.map((com) => (
//   <Comment comment={com.comment} key={com.id} />
// ))}
