import React, { useState } from "react";
import Comment from "./Comment";
import { Header, Segment, Form, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createComment, raiseAlert, lowerAlert } from "../../actions";

const ShowComments = ({ art }) => {
  const dispatch = useDispatch();
  const [cmt, setCmt] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (user) {
      dispatch(
        createComment({
          comment: cmt,
          user_id: user.id,
          commentable_id: art.id,
          commentable_type: "Art",
        })
      );
      setCmt("")
      setLoading(false)
    } else {
      dispatch(raiseAlert("Please connect to MetaMask to interact"));
      dispatch(lowerAlert());
      setLoading(false)
    }
  };
  return (
    <div className="artshow details">
      <Header as="h4" attached="top" className="artshow detail title" block>
        Comments
      </Header>
      <Segment attached className="likes background commentsection">
        {art.comments.map((comment, index) => (
        
          <Comment
            key={index.toString() + comment.id.toString() + art.id.toString()}
            comment={comment} commentType="artcomment"
            art={art}
          />
       
        ))}
      </Segment>
      <Form>
        <Segment attached>
          <Form.TextArea onChange={(e) => setCmt(e.target.value)} value={cmt} placeholder={`Commenting on @${art.user.username}'s art ...`}/>
        </Segment>
        <Header attached="bottom" className="artshow detail title" block>
          <a
            href="/addcomment"
            className="show reply"
            onClick={(e) => handleComment(e)}
          >
            {" "}
            <Icon name="edit" loading={loading}/> Add Comment
          </a>
        </Header>
      </Form>
    </div>
  );
};

export default ShowComments;
