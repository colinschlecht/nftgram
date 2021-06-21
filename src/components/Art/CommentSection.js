import React, { useState } from "react";
import { Comment as Comm, Divider } from "semantic-ui-react";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { useSelector, useDispatch, } from "react-redux";
import { createComment, raiseAlert, lowerAlert } from "../../actions";

export const CommentSection = ({ art }) => {
  const dispatch = useDispatch();




  const [expanded, setExpanded] = useState(false);
  const [artComments, /*setArtComments*/] = useState(art.comments);
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  

  //expands the comment section
  const handleExpandClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  //handles comment submission

  //!try passing e
  const onSubmit = (formValues) => {
    if(user){
      dispatch(
        createComment({
          ...formValues,
          user_id: user.user.id,
          commentable_id: art.id,
          commentable_type: "Art",
        }));
    } else {
      dispatch(raiseAlert("please connect to MetaMask to interract"));
      dispatch(lowerAlert());
    }
  };

  return (
    <Comm.Group id={"comment-section"}>
      {!expanded ? (
        <>
          {artComments.length > 0 && artComments.length < 3 ? (
            <>
              <a
                className="reply comment expand"
                href="/"
                onClick={(e) => handleExpandClick(e)}
              >
                View all {artComments.length} comments
              </a>
              {artComments.map((com) => (
                <Comment
                  key={com.id}
                  comment={com}
                />
              ))}
            </>
          ) : (
            <>
              {artComments.length > 0 ? (
                <>
                  <a
                    className="reply comment expand"
                    href="/"
                    onClick={(e) => handleExpandClick(e)}
                  >
                    View all {artComments.length} comments
                  </a>
                  {artComments.slice(-2).map((com) => (
                    <Comment
                      comment={com}
                      key={com.id}
                    />
                  ))}
                </>
              ) : null}
            </>
          )}
          <Divider />
          <CommentForm art={art} commentType={"Art"} onSubmit={onSubmit} />
        </>
      ) : (
        <>
          <>
            <a
              className="reply comment expand"
              href="/"
              onClick={(e) => handleExpandClick(e)}
            >
              Collapse Comments
            </a>
            {artComments.map((com) => (
              <Comment
              art={art}
                handleExpandClick={() => handleExpandClick}
                key={com.id}
                comment={com}
              />
            ))}
          </>
          <a
            className="reply comment expand"
            href="/"
            onClick={(e) => handleExpandClick(e)}
          >
            Collapse Comments
          </a>
          <Divider />
          <CommentForm art={art} commentType={"Art"} onSubmit={onSubmit} />
        </>
      )}
    </Comm.Group>
  );
};
