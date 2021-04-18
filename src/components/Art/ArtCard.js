import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CommentSection } from "./CommentSection";

export const ArtCard = ({ art, page }) => {
  const [thisart, setArt] = useState(art);

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
          {thisart.likes.length > 3 ? (
            <p className="explore art card">
              liked by{" "}
              <a className="explore art card" href="/">
                <span className="explore art card username">
                  {thisart.likes[0].user.username}
                </span>{" "}
                and{" "}
                <span className="explore art card likes">
                  {thisart.likes.length - 1} others
                </span>
              </a>{" "}
            </p>
          ) : thisart.likes.length > 1 ? (
            <p className="explore art card">
              liked by{" "}
              <a className="explore art card" href="/">
                <span className="explore art card username">
                  {thisart.likes[0].user.username}
                </span>{" "}
                and{" "}
                <span className="explore art card username">
                  {thisart.likes[1].user.username}
                </span>
                <span className="explore art card likes"></span>
              </a>{" "}
            </p>
          ) : (
            <p className="explore art card">
              liked by{" "}
              <a className="explore art card" href="/">
                <span className="explore art card username">
                  {thisart.likes.length > 0
                    ? thisart.likes[0].user.username
                    : "nobody..."}
                </span>
                <span className="explore art card likes"></span>
              </a>{" "}
            </p>
          )}

          <p className="explore art card">
            <span className="explore art card username">
              <a href="/" className="explore art card username">
                {thisart.user.username}
              </a>
            </span>
            &nbsp;&nbsp;{thisart.caption}
          </p>
          <CommentSection art={art} />
        </Card.Content>
      </Card>
    </>
  );
};
