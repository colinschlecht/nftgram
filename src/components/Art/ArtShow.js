import React, { useEffect, useState } from "react";
import {
  showArt,
  createArtLike,
  destroyArtLike,
  raiseAlert,
  lowerAlert,
} from "../../actions/";
import { useDispatch, useSelector } from "react-redux";


import { Header, Icon, Segment, Divider, Popup } from "semantic-ui-react";
import CopyButton from "../header/copyButton";



const ArtShow = ({ match }) => {
  const dispatch = useDispatch();

  const [art, setArt] = useState({});

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

  useEffect(() => {
    showArt(match.params.id).then((resp) => setArt(resp.data));
    setLiked(
      !!art.likes?.find((like) => {
        if (user) {
          return like.user_id === user.user.id;
        } else {
          return false;
        }
      })
    );
  }, [match.params.id, user, art]);

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

  const truncateText = (text) => {
    if (window.innerWidth < 530) {
      return `${text.slice(0, Math.floor(window.innerWidth / 15))}...`;
    } else {
      return text;
    }
  };

  const handleShowPrice = (e) => {
    e.preventDefault();
    dispatch(raiseAlert("Item is not currently for sale"));
    dispatch(lowerAlert());
  };

  return (
    <div className="container">
      <Divider />
      <div className="artshow header">
        <div className="outer artshow left">
          <div className="imagecontainer">
            <img
              className="ui fluid image"
              src={`https://ipfs.io/ipfs/${art.cid}`}
              alt={art.description}
            />
          </div>
          <div className="artshow caption">
            <h4>{art.caption}</h4>
          </div>
          <div className="artshow nftg-specs">
            <h4>
              <a
                id="like-button-main"
                href={`/art/show/${art.id}`}
                className="like button icon"
                onClick={(e) => handleLike(e)}
              >
                <Icon name="fire" />
              </a>
              {art.likes?.length} Likes
              
            </h4>
          </div>
          <div classname="buy sell box">
          {art.for_sale ? (
                <a
                  id="like-button-main"
                  href={`/art/show/${art.id}`}
                  className="like button icon"
                  color="green"
                  onClick={(e) => handleLike(e)}
                >
                  <Icon color="green" name="ethereum" />
                </a>
              ) : (
                <>
                  <a
                    id="like-button-main"
                    href={`/art/show/${art.id}`}
                    className="like button icon ethereum"
                    onClick={(e) => handleShowPrice(e)}                    
                  >
                    <Icon color="red" name="ethereum" />
                  </a>
                </>
              )}
              {wallet?.account === art.user?.metamask_account ? (
            
            <Icon name="edit outline"></Icon>
            
          ) : "null"}
          </div>
        </div>

        <div className="artshow details">
          <Header as="h4" attached="top" className="artshow detail title" block>
            Name
          </Header>
          <Segment attached className="artshow detail seg">
            {art.name}
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Description
          </Header>
          <Segment attached className="artshow detail seg">
            {art.description}t
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Owner
          </Header>
          <Segment attached className="artshow detail seg">
            {art.user?.username}
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Created by
          </Header>
          <Segment attached className="artshow detail seg">
            {art.artist?.name}
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Artwork CID
          </Header>
          <Segment attached className="artshow detail seg">
            {art?.cid && truncateText(art?.cid.toString())}
            <CopyButton message={art.cid} />
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Token URI
          </Header>
          <Segment attached className="artshow detail seg">
            {art?.tokenURI && truncateText(art?.tokenURI.toString())}{" "}
            <CopyButton message={art.tokenURI} />
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            ERC 721 Contract Address
          </Header>
          <Segment attached className="artshow detail seg">
            {art?.contract_address &&
              truncateText(art?.contract_address.toString())}
            <CopyButton message={art.contract_address} />
          </Segment>
          <Header className="artshow detail title" as="h4" attached block>
            Token ID
          </Header>
          <Segment attached="bottom" className="artshow detail title">
            {art.tokenID}
          </Segment>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ArtShow;
