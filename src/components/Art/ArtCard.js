import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CommentSection } from "./CommentSection";
import { createArtLike, destroyArtLike } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

export const ArtCard = ({ art }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const [liked, setLiked] = useState(
    !!art.likes.find((like) => {
      if (user) {
        return like.user_id === user.user.id;
      } else {
        return false;
      }
    })
  );

  //!\///////// like a post/artwork or unlike /////////////
  const handleLike = (e) => {
    e.preventDefault();
    if (user) {
      if (!liked) {
        setLiked(!liked);
        dispatch(
          createArtLike({
            user_id: user.user.id,
            likeable_type: "Art",
            likeable_id: art.id,
          })
        );
      } else {
        setLiked(!liked);
        let disLike = art.likes.find((like) => like.user_id === user.user.id);
        dispatch(destroyArtLike(disLike.id, disLike));
      }
    } else {
      alert("Please connect to MetaMask to interact");
    }
  };

  //!\///////////////////////////////////////////////

  //!\///////// select a user profile or list /////////////
  const handleUserClick = (e) => {
    e.preventDefault();
    //pull up the selected user profile
  };

  const handleLikeCountClick = (e) => {
    e.preventDefault();
    //pull up all users who liked
  };
  //!\///////////////////////////////////////////////

  return (
    <>
      <Card fluid id="art-card">
        {art.link ? (
          <Image
            src={`https://ipfs.io/ipfs/${art.cid}`}
            fluid
            onClick={(e) => handleLike(e)}
          />
        ) : (
          <Image
            src="https://react.semantic-ui.com/images/wireframe/image.png"
            fluid
            onClick={(e) => handleLike(e)}
          />
        )}
        <Card.Content>
          <Card.Header>
            <>
              <a
                id="like-button-main"
                href="/"
                className="like button icon"
                onClick={(e) => handleLike(e)}
              >
                <Icon name="fire" />
              </a>
            </>
          </Card.Header>
          <>
            {art.likes.length > 3 ? (
              <p className="explore art card">
                liked by{" "}
                <a
                  className="explore art card"
                  href="/"
                  onClick={(e) => handleUserClick(e)}
                >
                  <span className="explore art card username">
                    {art.likes[0].user.username}
                  </span>{" "}
                </a>
                and{" "}
                <span className="explore art card likes">
                  <a
                    className="explore art card"
                    href="/"
                    onClick={(e) => handleLikeCountClick(e)}
                  >
                    {art.likes.length - 1} others
                  </a>{" "}
                </span>
              </p>
            ) : art.likes.length > 1 ? (
              <p className="explore art card">
                liked by{" "}
                <a
                  className="explore art card"
                  href="/"
                  onClick={(e) => handleUserClick(e)}
                >
                  <span className="explore art card username">
                    {art.likes[0].user.username}
                  </span>{" "}
                </a>
                and{" "}
                <a
                  className="explore art card"
                  href="/"
                  onClick={(e) => handleUserClick(e)}
                >
                  <span className="explore art card username">
                    {art.likes[1].user.username}
                  </span>
                </a>
                <span className="explore art card likes"></span>{" "}
              </p>
            ) : (
              <p className="explore art card">
                liked by{" "}
                <span className="explore art card username">
                  {art.likes.length > 0 ? (
                    <a
                      className="explore art card"
                      href="/"
                      onClick={(e) => handleUserClick(e)}
                    >
                      {art.likes[0].user.username}
                    </a>
                  ) : (
                    "nobody... yet!"
                  )}
                </span>
              </p>
            )}

            <p className="explore art card">
              <span className="explore art card username">
                <a
                  href="/"
                  className="explore art card username"
                  onClick={(e) => handleUserClick(e)}
                >
                  {art.user.username}
                </a>
              </span>
              &nbsp;&nbsp;{art.caption}
            </p>
            <CommentSection art={art} />
          </>
        </Card.Content>
      </Card>
    </>
  );
};
