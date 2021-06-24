import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Reply from "./Reply";
import { Card, Image, Icon, Form } from "semantic-ui-react";
import logo from "../../images/ethcam.svg";
import { createCommentComment, raiseAlert, lowerAlert } from "../../actions";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();

  const [cmt, setCmt] = useState("");
  const [replying, setReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const userAvi = comment.user.avatar ? `https://ipfs.io/ipfs/${comment.user.avatar}` : logo;

  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const handleReply = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user) {
      dispatch(
        createCommentComment({
          comment: cmt,
          user_id: user.user.id,
          commentable_id: comment.id,
          commentable_type: "Comment",
        })
      );
      setReplying(!replying);
      setCmt("");
      setLoading(false);
    } else {
      dispatch(raiseAlert("Please connect to MetaMask to interact"));
      dispatch(lowerAlert());
      setLoading(false);
    }
  };

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

  const handleCommentLike = (e) => {
    e.preventDefault();
  };
  const handleReplyClick = (e) => {
    e.preventDefault();
    setReplying(!replying);
  };
  return (
    <>
      <Card className="comment card" id="comment-card">
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
        {replying ? (
          <>
            <Card.Content extra id="comment-reply" className="">
              <a href="/replytocomment" onClick={(e) => handleReplyClick(e)}>
                Cancel
              </a>
              <a
                href="/likethiscomment"
                className="comment like button icon"
                onClick={(e) => handleCommentLike(e)}
              >
                <Icon name="fire" />
              </a>
              <Form className="reply form">
                <Form.TextArea
                  onChange={(e) => setCmt(e.target.value)}
                  value={cmt}
                  placeholder={`Replying to @${comment.user.username}'s comment ...`}
                />

                <div className="commentbuttonarea">
                  <a
                    href="/addcomment"
                    className="show reply"
                    onClick={(e) => handleReply(e)}
                  >
                    {" "}
                    <Icon name="edit" loading={loading} /> Add Comment
                  </a>
                </div>
              </Form>
            </Card.Content>
          </>
        ) : (
          <>
            <Card.Content extra>
              <a href="/replytocomment" onClick={(e) => handleReplyClick(e)}>
                Reply
              </a>
              <a
                href="/likethiscomment"
                className="comment like button icon"
                onClick={(e) => handleCommentLike(e)}
              >
                <Icon name="fire" />
              </a>
            </Card.Content>
          </>
        )}
      </Card>
      {comment.comments.map((reply, index) => (
        <Reply
          reply={reply}
          key={index.toString() + reply.id.toString() + comment.id.toString()}
          commentType="commentreply"
          replyFor={comment.user.username}
        />
      ))}
    </>
  );
};

export default Comment;
