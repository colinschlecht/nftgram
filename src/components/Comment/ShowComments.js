import React, { useState } from "react";
import Comment from "./Comment";
import { Header, Segment, Form, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createComment, raiseAlert, lowerAlert } from "../../actions";

const ShowComments = ({ art }) => {
  const dispatch = useDispatch();
  const [cmt, setCmt] = useState("");

  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const handleComment = async (e) => {
    e.preventDefault();
    if (user) {
      dispatch(
        createComment({
          comment: cmt,
          user_id: user.user.id,
          commentable_id: art.id,
          commentable_type: "Art",
        })
      );
    } else {
      dispatch(raiseAlert("Please connect to MetaMask to interact"));
      dispatch(lowerAlert());
    }
  };
  return (
    <div className="artshow details">
      <Header as="h4" attached="top" className="artshow detail title" block>
        Comments
      </Header>
      <Segment attached className="likes background">
        {art.comments.map((comment) => (
          <Comment
            key={`comment ${comment.id} on art ${art.id}`}
            comment={comment}
          />
        ))}
      </Segment>
      <Form>
        <Segment attached>
          <Form.TextArea onChange={(e) => setCmt(e.target.value)} value={cmt} />
        </Segment>
        <Header attached="bottom" className="artshow detail title" block>
          <a
            href="/addcomment"
            className="show reply"
            placeholder={`poop`}
            onClick={(e) => handleComment(e)}
          >
            {" "}
            <Icon name="edit" /> Add Comment
          </a>
        </Header>
      </Form>
    </div>
  );
};

export default ShowComments;
