import React, { useState  } from "react";
import { Comment as Comm, Divider } from "semantic-ui-react";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../actions";

export const CommentSection = ({ art }) => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [artComments, /*setArtComments*/] = useState(art.comments);
  const user = useSelector((state) => state.auth.user.user);


  

  //expands the comment section
  const handleExpandClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  //handles comment submission
  const onSubmit = (formValues) => {
    dispatch(
      createComment({
        ...formValues,
        user_id: user.id,
        commentable_id: art.id,
        commentable_type: "Art",
      })
    )
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
