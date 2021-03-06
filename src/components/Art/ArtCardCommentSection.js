import React from "react";
import { Segment } from "semantic-ui-react";

import Comment from "../Comment/Comment";

const oddOrEven = (index) => (index % 2 === 0 ? "even" : "odd");

const ArtCardCommentSection = ({ art, extended, handleDisplay, hasComments}) => {
  return (
    <>
      <Segment attached="top" className="comment section top" id="link-text">
        {extended ? `${!hasComments ? "No Comments or Replies" : "Comments and Replies" }` : `${!hasComments ? "No " : "" }Comments`}
      </Segment>
      <div className={`explore art card comment holder ${hasComments}`} >
        {extended
          ? art.comments.map((comment, index) => (
              <Segment
                className={`comment-${oddOrEven(index)}`}
                key={comment.id}
                attached
              >
                <Comment
                  id={index}
                  location="explore art card"
                  key={`a${art.id}c${comment.id}`}
                  comment={comment}
                  extended={true}
                />
              </Segment>
            ))
          : art.comments.map((comment, index) => (
              <Segment
                className={`comment-${oddOrEven(index)}`}
                key={comment.id}
                attached
              >
                <Comment
                  id={index}
                  commentType="artcomment"
                  location="explore art card"
                  key={`a${art.id}c${comment.id}`}
                  comment={comment}
                  extended={false}
                />
              </Segment>
            ))}
      </div>
      <Segment attached="bottom" className="comment section bottom">
        {!extended ? (
          <a
            href="/view/all/replies"
            id="link-text"
            className="artcard"
            onClick={(e) => handleDisplay(e, "EXTENDED")}
          >
            View all replies
          </a>
        ) : (
          <a
            href="/view/all/replies"
            id="link-text"
            className="like button icon"
            onClick={(e) => handleDisplay(e, "COMMENTS")}
          >
            View comments only
          </a>
        )}
      </Segment>
    </>
  );
};

export default ArtCardCommentSection;
