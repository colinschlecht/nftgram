import React, { useEffect, useState } from "react";
import {
  showArt,
  createArtLike,
  destroyArtLike,
  raiseAlert,
  lowerAlert,
} from "../../actions/";
import { useDispatch, useSelector } from "react-redux";

import { Header, Icon, Segment, Divider, Label } from "semantic-ui-react";
import CopyButton from "../header/copyButton";
import ShowDetails from "./ShowDetails";

const ArtShow = ({ match }) => {
  const dispatch = useDispatch();

  const [art, setArt] = useState({});

  const [displayLikes, setDisplayLikes] = useState(false);
  const [displayComments, setdisplayComments] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
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

  console.log("hi");

  useEffect(() => {
    showArt(match.params.id).then((resp) => {
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
      // alert("Please connect to MetaMask to interact");
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

  const handleDisplayLikes = (e) => {
    e.preventDefault()
    setDisplayLikes(!displayLikes)
  }
  const handleDisplayComments = (e) => {
    e.preventDefault()
    setdisplayComments(!displayComments)
  }
  const handleDisplayEvents = (e) => {
    e.preventDefault()
    setDisplayEvents(!displayEvents)
  }
  const handleDisplayDetails = (e) => {
    e.preventDefault()
    setDisplayDetails(!displayDetails)
  }
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
            <Segment attached="top" className="artshow nftg-specs">
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
                onClick={(e) => handleDisplayLikes(e)}>{art.likes?.length} Likes</a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplayComments(e)}
                >
                  <Icon name="comment" />
                {art.comments?.length} comments
                </a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplayEvents(e)}
                >
                  <Icon name="calendar" />
                {art.events?.length} events
                </a>
              </h4>
              <h4 className="displaychanger">
                <a
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  onClick={(e) => handleDisplayDetails(e)}
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
                      <>
                        //! if USER is OWNER
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

        <div className="artshow details">
          <Header className="artshow detail title" as="h4" attached="top" block>
            Owner
          </Header>
          <Segment attached className="artshow detail seg">
            {art.user?.username}
          </Segment>
          <Segment attached="bottom" className="artshow detail seg">
            <h5 className="trunc">
              <CopyButton message={art.user?.metamask_account} />
              {art.user?.metamask_account}
            </h5>
          </Segment>
          <Header className="artshow detail title" as="h4" attached="top" block>
            Created by
          </Header>
          <Segment attached className="artshow detail seg">
            {art.artist?.name}
          </Segment>
          <Segment attached="bottom" className="artshow detail seg">
            <h5 className="trunc">
              <CopyButton message={art.artist?.user?.metamask_account} />
              {art.artist?.user?.metamask_account}
            </h5>
          </Segment>
          <Header className="artshow detail title" as="h4" attached="top" block>
            Artwork CID
          </Header>
          <Segment attached className="artshow detail seg">
            <h5 className="trunc">
              <CopyButton message={art.cid} />
              {art?.cid}
            </h5>
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Token URI
          </Header>
          <Segment attached className="artshow detail seg">
            <h5 className="trunc">
              <CopyButton message={art.tokenURI} />
              {art?.tokenURI}
            </h5>
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            ERC 721 Contract Address
          </Header>
          <Segment attached className="artshow detail seg">
            <h5 className="trunc">
              <CopyButton message={art.contract_address} />
              {art?.contract_address}
            </h5>
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Token ID
          </Header>
          <Segment attached="bottom" className="artshow detail title">
            {art.tokenID}
          </Segment>
        </div>

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
