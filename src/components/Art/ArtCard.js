import React, { useState, useEffect } from "react";
import {
  Image,
  Icon,
  Segment,
  Header,
  Dropdown,
  Divider,
  Form,
  Loader,
} from "semantic-ui-react";
import {
  createComment,
  createArtLike,
  destroyArtLike,
  raiseAlert,
  lowerAlert,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import ArtCardLikeCount from "./ArtCardLikeCount";
import ArtCardCommentSection from "./ArtCardCommentSection";
import ArtCardLikesSection from "./ArtCardLikesSection";

export const ArtCard = ({ art }) => {
  const dispatch = useDispatch();
  //!for sending comment from comment form
  const [cmt, setCmt] = useState("");
  const [loading, setLoading] = useState(false);
  //! Makes use of the current user in global state
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  const [extended, setExtended] = useState(false);
  const [likes, setLikes] = useState(false);
  const [comments, setComments] = useState(true);

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

  const getDate = () => {
    let ms = (Date.now() - Date.parse(art.created_at)) / 1000 / 60 / 60 / 24;
    if (ms >= 1) {
      return Math.floor(ms) + " days ago";
    } else if (ms * 24 >= 1) {
      return Math.floor(ms * 24) + " hours ago";
    } else if (ms * 24 < 1) {
      return Math.floor(ms * 24 * 60) + " minutes ago";
    }
  };

  console.log(user)

  useEffect(() => {
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
      dispatch(raiseAlert("please connect to MetaMask to interract"));
      dispatch(lowerAlert());
    }
  };

  //!\///////////////////////////////////////////////
  //!\/////////// Post a Comment ////////////////

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user) {
      dispatch(
        createComment({
          comment: cmt,
          user_id: user.user.id,
          commentable_id: art.id,
          commentable_type: "Art",
        })
      );
      setCmt("");
      setLoading(false);
    } else {
      dispatch(raiseAlert("Please connect to MetaMask to interact"));
      dispatch(lowerAlert());
      setLoading(false);
    }
  };

  //!\///////// select a user profile or list /////////////

  //!\///////////////////////////////////////////////

  const handleDisplay = (e, display) => {
    setLikes(false);
    setComments(false);
    setExtended(false);
    e.preventDefault();
    switch (display) {
      case "LIKES":
        setLikes(true);
        break;
      case "COMMENTS":
        setComments(true);
        break;
      case "EXTENDED":
        setExtended(true);
        setComments(true);
        break;
      default:
        dispatch(raiseAlert("Error"));
        dispatch(lowerAlert());
    }
  };

  return (
    <>
      <div id="art-card-container">
        <Segment.Group id="art-card">
          <Header as="h4" attached="top" className="artshow detail title" block>
            <Link
              id="art-show-link"
              key={art.id + "a"}
              to={`/art/show/${art.id}`}
            >
              {" "}
              <span className="link-text-two">{art.name}</span>
            </Link>
          </Header>
          <Segment attached>
            <ImageContainer
              art={art}
              location="art card"
              handleLike={handleLike}
            />
          </Segment>

          <Segment attached className="caption seg">
            <span className="explore art card">
              <div className="explore art card username areadiv">
                <Link
                  className="explore art card username areadiv"
                  id="user-link"
                  key={art.user.id + "u"}
                  to={`/profile/${art.user.id}`}
                >
                  <Image
                    className="artcard caption section"
                    avatar
                    src={`https://ipfs.io/ipfs/${art.user.avatar}`}
                  />
                  <div>
                    {art.user.username}
                    <span id="cap" className="art card comment card metadata">
                      {getDate()}
                    </span>
                  </div>
                </Link>
              </div>

              <p className="art card caption caption">
                &nbsp;&nbsp;{art.caption}
              </p>
            </span>
          </Segment>
          <Segment attached>
            <div className="artcard explore likes seg">
              <div className="explore main likes">
                <a
                  id="like-button-main"
                  href="/"
                  className="like button icon"
                  onClick={(e) => handleLike(e)}
                >
                  <Icon name="fire" className="likebutton edit" />
                </a>
                <div className="explore likers head">
                  <ArtCardLikeCount art={art} handleDisplay={handleDisplay} />
                </div>
              </div>
            </div>

            <Divider />

            <Dropdown
              icon="ellipsis horizontal"
              id="ellips-edit"
              className="ellips edit"
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    id="user-link-dd"
                    key={art.user.id + "u"}
                    to={`/profile/${art.user.id}`}
                  >
                    Artist page
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <Link
                    id="art-link-dd"
                    key={art.id + "a"}
                    to={`/art/show/${art.id}`}
                  >
                    View art page
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                {!extended && (
                  <Dropdown.Item
                    text="All Comms. & Replies"
                    onClick={(e) => handleDisplay(e, "EXTENDED")}
                  />
                )}
                {extended && (
                  <Dropdown.Item
                    text="Comments"
                    onClick={(e) => handleDisplay(e, "COMMENTS")}
                  />
                )}
                {likes && (
                  <Dropdown.Item
                    text="Comments"
                    onClick={(e) => handleDisplay(e, "COMMENTS")}
                  />
                )}
                {comments && (
                  <Dropdown.Item
                    text="All Likers"
                    onClick={(e) => handleDisplay(e, "LIKES")}
                  />
                )}
              </Dropdown.Menu>
            </Dropdown>

            {comments && (
              <ArtCardCommentSection
                art={art}
                extended={extended}
                handleDisplay={handleDisplay}
              />
            )}
            {likes && <ArtCardLikesSection art={art} />}

            <Divider />

            <Form>
              <Form.TextArea
                onChange={(e) => setCmt(e.target.value)}
                value={cmt}
                placeholder={`Commenting on @${art.user.username}'s art ...`}
              />
            </Form>
          </Segment>
          <Header attached="bottom" className="artshow detail title" block>
            <a
              href="/addcomment"
              className="show reply"
              id="link-text-two"
              onClick={(e) => handleComment(e)}
            >
              <Icon name="edit" />{" "}
              {loading ? <Loader active inline size="mini" /> : "Add Comment"}
            </a>
          </Header>
        </Segment.Group>
      </div>
    </>
  );
};
