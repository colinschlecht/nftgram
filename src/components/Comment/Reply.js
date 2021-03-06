import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Form } from "semantic-ui-react";
import logo from "../../images/ethcam.svg";
import { createCommentComment, raiseAlert, lowerAlert } from "../../actions";
import Linkify from "react-linkify"
const Reply = ({ reply, commentType, replyFor, replyExtended }) => {
  const dispatch = useDispatch();

  const [cmt, setCmt] = useState("");
  const [replying, setReplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extended, setExtended] = useState(replyExtended);

  const userAvi = reply.user.avatar
    ? `https://ipfs.io/ipfs/${reply.user.avatar}`
    : logo;

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
          user_id: user.id,
          commentable_id: reply.id,
          commentable_type: "Comment",
        })
      );
      setReplying(!replying);
      setCmt("");
      setLoading(false);
      setExtended(true);
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

  const handleExtend = (e) => {
    e.preventDefault();
    setExtended(!extended);
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
      <Card className={`comment card ${commentType}`} id={`comment-card`}>
        <Card.Content className="comment card userdiv">
          <Link
            className="explore art card username areadiv"
            id="user-link"
            key={reply.user.id + "u"}
            to={`/profile/${reply.user.id}`}
          >
            <div className="avatar placeholder">
            <Image
              src={userAvi}
              alt={reply.user?.username}
              avatar
              className="avatar"
            />
            </div>
          </Link>
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
          <Card.Description><Linkify>{reply.comment}</Linkify></Card.Description>
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
                Reply <span> </span>
              </a>
              {reply.comments.length ? (
                <>
                  {extended ? (
                    <a
                      className="hide replies trigger"
                      href="/closereplies"
                      onClick={(e) => handleExtend(e)}
                    >
                      Hide Replies
                    </a>
                  ) : (
                    <a
                      className="hide replies trigger"
                      href="/viewreplies"
                      onClick={(e) => handleExtend(e)}
                    >
                      View {reply.comments.length} Replies
                    </a>
                  )}
                </>
              ) : null}
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

      {extended &&
        reply.comments.map((replyreply, index) => (
          <Reply
            reply={replyreply}
            replyExtended={extended}
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
