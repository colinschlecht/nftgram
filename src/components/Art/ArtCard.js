import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CommentSection } from "./CommentSection";

export const ArtCard = (props) => {
  const [{ art } /*, setArt*/] = useState(props);

  const likesHeader1 = (
    <p className="explore art card">
      liked by{" "}
      <a className="explore art card" href="/">
        <span className="explore art card username">{art.likes[0]}</span> and{" "}
        <span className="explore art card likes">
          {art.likes.length - 1} others
        </span>
      </a>{" "}
    </p>
  );
  const likesHeader2 =
    art.likes.length > 1 ? (
      <p className="explore art card">
        liked by{" "}
        <a className="explore art card" href="/">
          <span className="explore art card username">{art.likes[0]}</span> and{" "}
          <span className="explore art card username">{art.likes[1]}</span>
          <span className="explore art card likes"></span>
        </a>{" "}
      </p>
    ) : (
      <p className="explore art card">
        liked by{" "}
        <a className="explore art card" href="/">
          <span className="explore art card username">
            {art.likes[0] || "nobody..."}
          </span>
          <span className="explore art card likes"></span>
        </a>{" "}
      </p>
    );
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
            <Icon name="comment" />
          </Card.Header>
          {art.likes.length >= 3 ? likesHeader1 : likesHeader2}
          {/* <p className="explore art card">
            liked by{" "}
            <a className="explore art card" href="/">
              <span className="explore art card username">Elon Tusk</span> and{" "}
              <span className="explore art card likes">
                {art.likes.length} others
              </span>
            </a>{" "}
          </p> */}
          <p className="explore art card">
            <span className="explore art card username">
              <a href="/" className="explore art card username">
                {art.user.username}
              </a>
            </span>
            &nbsp;&nbsp;{art.caption}
          </p>
          <CommentSection art={art} />
        </Card.Content>
      </Card>
    </>
  );
};
