import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Image, Icon, Form } from "semantic-ui-react";
import logo from "../../images/ethcam.svg";
import { createCommentComment, raiseAlert, lowerAlert } from "../../actions";

const Reply = ({ reply, commentType, replyFor }) => {
  const dispatch = useDispatch();

  const [cmt, setCmt] = useState("");
  const [replying, setReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const userAvi = reply.user.avatar ? reply.user.avatar : logo;

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
          commentable_id: reply.id,
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

  const handleCommentLike = (e) => {
    e.preventDefault();
  };
  const handleReplyClick = (e) => {
    e.preventDefault();
    setReplying(!replying);
  };

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
                  placeholder={`Replying to @${reply.user.username}'s reply ...`}
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

      {reply.comments.map((replyreply, index) => (
        <Reply
          reply={replyreply}
          key={
            index.toString() + replyreply.id.toString() + reply.id.toString()
          }
          commentType="replyreply"
          replyFor={reply.user.username}
        />
      ))}
    </>
  );
};

export default Reply;
