import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Icon,
  Segment,
  Header,
  Dropdown,
  Divider,
  Form,
  Loader
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
import ArtCardLikeCount from "./ArtCardLikeCount";
import ArtCardCommentSection from "./ArtCardCommentSection";

export const ArtCard = ({ art }) => {
  const dispatch = useDispatch();
  //! Used in setting classname for art image
  const imgEl = useRef();
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

  //! gets image orientation and sets class name accordingly
  const getImageDim = async (imgEl) => {
    if (imgEl) {
      const width = await imgEl.current.naturalWidth;
      const height = await imgEl.current.naturalHeight;
      if (width > height) {
        return (imgEl.current.className = "explore landscape");
      } else {
        return (imgEl.current.className = "explore portrait");
      }
    }
  };

  const [extended, setExtended] = useState(false);
  const [likes, setLikes] = useState(false);
  const [comments, setComments] = useState(true);

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
    getImageDim(imgEl);
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

  const handleLikeCountClick = (e) => {
    e.preventDefault();
    //pull up all users who liked
  };
  //!\///////////////////////////////////////////////

  const handleDisplay = (e, display) => {
    e.preventDefault();
    switch (display) {
      case "LIKES":
        if (likes) break;
        setComments(false);
        setLikes(true);
        break;
      case "COMMENTS":
        if (comments) break;
        setLikes(false);
        setComments(!comments);
        break;
      case "EXTENDED":
        if (!extended) {
          setComments(true);
          setExtended(true);
        } else {
          setExtended(false);
        }
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
            {art.name}
          </Header>
          <Segment attached>
            <div className="explore picture container">
              {art.link ? (
                <>
                  <img
                    src={`https://ipfs.io/ipfs/${art.cid}`}
                    onClick={(e) => {
                      handleLike(e);
                    }}
                    ref={imgEl}
                    className="explore"
                    alt={`An NFT posted with a description of: ${art.description}`}
                  />
                </>
              ) : (
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                  fluid
                  onClick={(e) => handleLike(e)}
                />
              )}
            </div>
          </Segment>

          <Segment attached className="caption seg">
            <span className="explore art card">
              <span className="explore art card username">
                <Link
                  className="explore art card username"
                  id="user-link"
                  key={art.user.id + "u"}
                  to={`/profile/${art.user.id}`}
                >
                  <Image
                    className="artcard caption section"
                    avatar
                    src={`https://ipfs.io/ipfs/${art.user.avatar}`}
                  />
                  {art.user.username}
                </Link>
              </span>
              <span className="art card caption caption">
                &nbsp;&nbsp;{art.caption}
              </span>
            </span>

            <Dropdown
              icon="ellipsis horizontal"
              id="ellips-edit"
              className="ellips edit"
            >
              <Dropdown.Menu>
                <Dropdown.Item text="View artist page" />
                <Dropdown.Item text="View art page" />
                <Dropdown.Divider />
                {comments && (
                  <Dropdown.Item
                    text="All Comms. & Replies"
                    onClick={(e) => handleDisplay(e, "EXTENDED")}
                  />
                )}
                {extended && (
                  <Dropdown.Item
                    text="Only Comments"
                    onClick={(e) => handleDisplay(e, "COMMENTS")}
                  />
                )}
                <Dropdown.Item text="All Likers" />
              </Dropdown.Menu>
            </Dropdown>
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
                  <ArtCardLikeCount
                    art={art}
                    handleLikeCountClick={handleLikeCountClick}
                  />
                </div>
              </div>
            </div>

            <Divider />

            {comments && (
              <ArtCardCommentSection
                art={art}
                extended={extended}
                handleDisplay={handleDisplay}
              />
            )}
            {likes && <ArtCardCommentSection art={art} />}

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
              onClick={(e) => handleComment(e)}
            >
              <Icon name="edit" /> {loading ? <Loader active inline size="mini"/> : "Add Comment"}
            </a>
          </Header>
        </Segment.Group>
      </div>
    </>
  );
};
