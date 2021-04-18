import React, { useState } from "react";
import { Checkbox, Comment as Comm } from "semantic-ui-react";
import { Comment } from "./Comment";

export const CommentSection = (props) => {
  const [{ art } /*, setArt*/] = useState(props);
  const [artComments /*, setComments*/] = useState(art.comments);

  const expand = (e) => {
    e.preventDefault();
    //expands the comment section
    //displays more comments
    //text changes to "collapse"
  };

  return (
    <Comm.Group id={"comment-section"}>
      <>
        {artComments.length > 0 && artComments.length > 2 ? (
          <>
            <a className="reply comment expand" href="/" onClick={(e) => expand(e)}>
              View all {artComments.length} comments
            </a>
            <Comment />
          </>
        ) : (
          <Comment />
        )}
      </>
    </Comm.Group>
  );
};
