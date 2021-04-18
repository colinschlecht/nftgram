import React, { useState } from "react";
import { Comment as Comm, Divider} from "semantic-ui-react";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm"

export const CommentSection = ({ art }) => {
  const [thisart, setArt] = useState(art);
  const [artComments, setComments] = useState(art.comments);

  const expand = (e) => {
    e.preventDefault();
    //expands the comment section
    //displays more comments
    //text changes to "collapse"
  };


  const onSubmit = async (formValues) => {
    console.log(formValues);
    
    // await this.props.createUser(formValues).then((res) => {
    //   localStorage.setItem("token", res.data.jwt)
    //   console.log(res);
    //   if (res.status === 201) {
    //     this.props.history.push("/");
    //   }
    // });
  };

  return (
    <Comm.Group id={"comment-section"}>
      <>
        {artComments.length > 0 && artComments.length > 2 ? (
          <>
            <a
              className="reply comment expand"
              href="/"
              onClick={(e) => expand(e)}
            >
              View all {artComments.length} comments
            </a>
            <Comment comment={artComments[0]}/>
            <Comment comment={artComments[1]}/>
          </>
        ) : (
          <>
            <Comment comment={artComments[1]}/>
          </>
        )}
        <Divider />
        <CommentForm onSubmit={onSubmit}/>
      </>
    </Comm.Group>
  );
};
