import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CommentSection } from "./CommentSection";


export const ArtCard = (props) => {
  const [{art}/*, setArt*/] = useState( props );
  return (
    <>
      <Card fluid>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          fluid
        />
        <Card.Content>
          <Card.Header>
            <Icon name="like" />
          </Card.Header>
          <p className="explore art card">
            liked by{" "}
            <a className="explore art card" href="/">
              <span className="explore art card username">Elon Tusk</span> and{" "}
              <span className="explore art card likes">
                {art.likes} others
              </span>
            </a>{" "}
          </p>
          <p className="explore art card">
            <span className="explore art card username">
            <a className="explore art card">{art.user.username}</a>
            </span> &nbsp; {art.caption}
          </p>
          <CommentSection art={art}/>
        </Card.Content>
      </Card>
    </>
  );
};
