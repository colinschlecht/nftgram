import React, { useState, useEffect, useRef } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CommentSection } from "./CommentSection";
import { createArtLike, destroyArtLike } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export const ArtCard = ({ art }) => {
  const dispatch = useDispatch();
//! Used in setting classname for art image
  const imgEl = useRef();
//! Makes use of the current user in global state
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });
//! Sets liked status in local state
  const [liked, setLiked] = useState(
    !!art.likes.find((like) => {
      if (user) {
        return like.user_id === user.user.id;
      } else {
        return false;
      }
    })
  );

  useEffect(() => {
    //! Get natural height and natural width and set className for image display accordingly
    const getImageDim = async () => {
      const width = await imgEl.current.naturalWidth
      const height = await imgEl.current.naturalHeight
      if (width > height) {
        return imgEl.current.className = "landscape";
      } else {
        return imgEl.current.className = "portrait";
      }
    };
    getImageDim()
    //! Sets liked status in local state on render
    setLiked(
      !!art.likes.find((like) => {
        if (user) {
          return like.user_id === user.user.id;
        } else {
          return false;
        }
      })
    );
  }, [user, art]);

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

  const handleLikeCountClick = (e) => {
    e.preventDefault();
    //pull up all users who liked
  };
  //!\///////////////////////////////////////////////

  return (
    <>
      <Card fluid id="art-card">
        {art.link ? (
          <img
            src={`https://ipfs.io/ipfs/${art.cid}`}
            onClick={(e) => {
              handleLike(e);
            }}
            ref={imgEl}
            alt={`An NFT posted with a description of: ${art.description}`}
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
                <Link
                  id="user-link"
                  key={art.likes[0].user.id + "u"}
                  to={`/profile/${art.likes[0].user.id}`}
                >
                  <span className="explore art card username">
                    {art.likes[0].user.username}
                  </span>{" "}
                </Link>
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
                <Link
                  id="user-link"
                  key={art.likes[0].user.id + "u"}
                  to={`/profile/${art.likes[0].user.id}`}
                >
                  <span className="explore art card username">
                    {art.likes[0].user.username}
                  </span>{" "}
                </Link>
                and{" "}
                <Link
                  id="user-link"
                  key={art.likes[1].user.id + "u"}
                  to={`/profile/${art.likes[1].user.id}`}
                >
                  <span className="explore art card username">
                    {art.likes[1].user.username}
                  </span>
                </Link>
                <span className="explore art card likes"></span>{" "}
              </p>
            ) : (
              <p className="explore art card">
                liked by{" "}
                <span className="explore art card username">
                  {art.likes.length > 0 ? (
                    <Link
                      id="user-link"
                      key={art.likes[0].user.id + "u"}
                      to={`/profile/${art.likes[0].user.id}`}
                    >
                      {art.likes[0].user.username}
                    </Link>
                  ) : (
                    "nobody... yet!"
                  )}
                </span>
              </p>
            )}

            <p className="explore art card">
              <span className="explore art card username">
                <Link
                  id="user-link"
                  key={art.user.id + "u"}
                  to={`/profile/${art.user.id}`}
                >
                  {art.user.username}
                </Link>
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
