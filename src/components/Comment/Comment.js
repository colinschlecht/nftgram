import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Reply from "./Reply";
import { Card, Image, Icon, Form } from "semantic-ui-react";
import logo from "../../images/ethcam.svg";
import { createCommentComment, raiseAlert, lowerAlert } from "../../actions";
import Linkify from "react-linkify"

const Comment = ({ comment, extended, commentType }) => {
  const dispatch = useDispatch();

  const [cmt, setCmt] = useState("");
  const [replying, setReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const userAvi = comment.user.avatar
    ? `https://ipfs.io/ipfs/${comment.user.avatar}`
    : logo;

  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const [replyExtended, setExtended] = useState(extended);

  useEffect(() => {
    setExtended(extended);
  }, [extended]);

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
      setExtended(true);
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

  const handleExtend = (e) => {
    e.preventDefault();
    setExtended(!replyExtended);
  };
  return (
    <>
      <Card className={`comment card ${commentType}`} id={`comment-card`}>
        <Card.Content className="comment card userdiv">
          <Link
            className="explore art card username areadiv"
            id="user-link"
            key={comment.user.id + "u"}
            to={`/profile/${comment.user.id}`}
          >
            <div className="avatar placeholder">
              <Image
                src={userAvi}
                alt={comment.user?.username}
                avatar
                className="avatar"
              />
            </div>
          </Link>
          <div className="comment card text-header">
            <span className="comment card username">
              {comment.user.username}
            </span>
            <span className="comment card metadata">{getDate()}</span>
          </div>
        </Card.Content>
        <Card.Content>
          <Card.Description><Linkify>{comment.comment}</Linkify></Card.Description>
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
                Reply<span> </span>
              </a>
              {comment.comments.length ? (
                <>
                  {replyExtended ? (
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
                      View {comment.comments.length} Replies
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
      {replyExtended &&
        comment.comments.map((reply, index) => (
          <Reply
            reply={reply}
            key={index.toString() + reply.id.toString() + comment.id.toString()}
            commentType="commentreply"
            replyFor={comment.user.username}
            replyExtended={replyExtended}
          />
        ))}
    </>
  );
};

export default Comment;
