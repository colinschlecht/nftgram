import React, { useState } from "react";
import { Comment as Comm, Icon} from "semantic-ui-react";

export const Comment = () => {
  return (
    <>
      <Comm>
        <Comm.Content>
          <Comm.Author className="explore art card username" as="a">Christian Rocha</Comm.Author>
          &nbsp;&nbsp;<span className="comment text">This is a comment</span>
          <Icon name='like' id="small-like-btn"/>
          <Comm.Actions>
            <a href="/">Reply</a>
          </Comm.Actions>
        </Comm.Content>
      </Comm>
    </>
  );
};
