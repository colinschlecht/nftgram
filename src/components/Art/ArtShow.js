import React, { useEffect, useState } from "react";
import {
  showArt,
  createArtLike,
  destroyArtLike,
  raiseAlert,
  lowerAlert,
  createComment,
  resetAllLoaded
} from "../../actions/";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../images/ethcam.svg";
import ShowDetails from "./ShowDetails";
import ShowLikes from "./ShowLikes";
import ShowEvents from "./ShowEvents";
import ShowComments from "../Comment/ShowComments";

import {
  Header,
  Icon,
  Segment,
  Divider,
  Label,
  Image,
} from "semantic-ui-react";

const ArtShow = ({ match }) => {
  const dispatch = useDispatch();

  const [art, setArt] = useState({});
  console.log("hi")

console.log(art.comments)

const arts = useSelector(state => state.art.arts)

  const [displayLikes, setDisplayLikes] = useState(false);
  const [displayComments, setdisplayComments] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(true);
  const [displayEvents, setDisplayEvents] = useState(false);

  const wallet = useSelector((state) => state.MetaMask);
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });

  
  const [liked, setLiked] = useState(
    !!art.likes?.find((like) => {
      if (user) {
        return like.user_id === user.user.id;
      } else {
        return false;
      }
    })
    );
    
    console.log(liked)
  const userAvi = art?.user?.avatar;

  useEffect(() => {
    dispatch(showArt(match.params.id)).then((resp) => {
      setArt(resp.data);
      setLiked(
        !!resp.data.likes?.find((like) => {
          if (user) {
            return like.user_id === user.user.id;
          } else {
            return false;
          }
        })
      );
    });
    return ()=> {
      dispatch(resetAllLoaded())
    }
  }, [match.params.id, user, liked]);

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
      dispatch(raiseAlert("Please connect to MetaMask to interact"));
      dispatch(lowerAlert());
    }
  };

  const handleShowPrice = (e) => {
    e.preventDefault();
    dispatch(raiseAlert("Item is not currently for sale"));
    dispatch(lowerAlert());
  };

  const handlePurchase = (e) => {
    e.preventDefault();
  };
  const handlePurchaseCancel = (e) => {
    e.preventDefault();
  };

  const handleList = (e) => {
    e.preventDefault();
  };

  const handleDisplay = (e, display) => {
    e.preventDefault();
    setDisplayLikes(false);
    setDisplayDetails(false);
    setdisplayComments(false);
    setDisplayEvents(false);
    switch (display) {
      case "LIKES":
        return setDisplayLikes(!displayLikes);
      case "DETAILS":
        return setDisplayDetails(!displayDetails);
      case "COMMENTS":
        return setdisplayComments(!displayComments);
      case "EVENTS":
        return setDisplayEvents(!displayEvents);
      default:
        dispatch(raiseAlert("Error"));
        dispatch(lowerAlert());
    }
  };

  return (
    <div className="container">
      <Segment className="artshow header">
        <div className="outer artshow left">
          <Header as="h4" attached="top" className="artshow detail title" block>
            {art.name}
          </Header>

          <Segment attached>
            <div className="imagecontainer artshow">
              <img
                className="artshow image portrait"
                src={`https://ipfs.io/ipfs/${art.cid}`}
                alt={art.description}
              />
            </div>
          </Segment>

          <Segment attached="bottom" className="artshow caption bottom">
            <h4>{art.caption}</h4>
          </Segment>

          <Segment.Group>
            <Segment
              attached="top"
              className="artshow nftg-specs ui block header"
              as="h4"
            >
              {userAvi ? (
                <Image src={userAvi} alt={art?.user?.username} avatar></Image>
              ) : (
                <Image src={logo} alt={art?.user?.username} avatar></Image>
              )}
              {art?.user?.username}
            </Segment>
            <Segment attached className="artshow nftg-specs">
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleLike(e)}
                >
                  <Icon name="fire" />
                </a>
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplay(e, "LIKES")}
                >
                  {art.likes?.length} Likes
                </a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplay(e, "COMMENTS")}
                >
                  <Icon name="comment" />
                  {art.comments?.length} comments
                </a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplay(e, "EVENTS")}
                >
                  <Icon name="calendar" />
                  {art.events?.length} events
                </a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplay(e, "DETAILS")}
                >
                  <Icon name="info circle" />
                  {art.events?.length} details
                </a>
              </h4>
            </Segment>
            <Segment attached="bottom" className="buy sell bottom">
              <Label tag className="pricetag">
                {art.for_sale ? (
                  //! if item IS for sale
                  <>
                    {art.user?.metamask_account === wallet?.account ? (
                      //! if USER is OWNER
                      <>
                        <a
                          href={`/art/show/${art.id}`}
                          className="ethereum sale"
                          color="green"
                          onClick={(e) => handlePurchaseCancel(e)}
                        >
                          <Icon color="green" name="ethereum" />
                        </a>
                        <p className="pricemessage">Click to cancel listing</p>
                      </>
                    ) : (
                      //! if USER is BUYER
                      <>
                        <a
                          href={`/art/show/${art.id}`}
                          className="ethereum sale"
                          color="green"
                          onClick={(e) => handlePurchase(e)}
                        >
                          <Icon color="green" name="ethereum" />
                        </a>
                        <p className="pricemessage">Click to purchase</p>
                      </>
                    )}
                  </>
                ) : (
                  //! if item NOT is for sale
                  <>
                    {art.user?.metamask_account === wallet?.account ? (
                      //! User is OWNER
                      <>
                        <a
                          href={`/art/show/${art.id}`}
                          className="ethereum sale"
                          onClick={(e) => handleList(e)}
                        >
                          <Icon color="red" name="ethereum" />
                          <span>0.0 ETH</span>
                        </a>
                        <p className="pricemessage">List for sale</p>
                      </>
                    ) : (
                      //! User is NOT OWNER
                      <>
                        <a
                          href={`/art/show/${art.id}`}
                          className="ethereum sale"
                          onClick={(e) => handleShowPrice(e)}
                        >
                          <Icon color="red" name="ethereum" />
                          <span>0.0 ETH</span>
                        </a>
                        <p className="pricemessage">Not for sale</p>
                      </>
                    )}
                  </>
                )}
              </Label>
              <span className="cartspan">
                <a
                  href={`/art/show/${art.id}`}
                  className="ethereum sale shoppingcart"
                  onClick={(e) => handleShowPrice(e)}
                >
                  <Icon color="red" name="cart" className="shoppingcart" />
                </a>
                <p className="salemessage">Not for sale</p>
              </span>
            </Segment>
          </Segment.Group>
        </div>
        {
          //! SHOW ART DETAILS
        }
        {displayDetails && <ShowDetails art={art} />}
        {
          //! SHOW ART LIKES
        }
        {displayLikes && <ShowLikes art={art} />}
        {
          //! SHOW ART EVENTS
        }
        {displayEvents && <ShowEvents art={art} />}
        {
          //! SHOW ART COMMENTS
        }
        {displayComments && <ShowComments art={art} />}

        <Segment
          className="artshowdetail description ui block header"
          as="h4"
          attached="top"
        >
          Description
        </Segment>
        <Segment attached="bottom" className="artshowdetail description ">
          {art.description}
        </Segment>
      </Segment>

      <Divider />
    </div>
  );
};

export default ArtShow;
