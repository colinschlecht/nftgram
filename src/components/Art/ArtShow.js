import React, { useEffect, useState } from "react";
import { showArt } from "../../actions/";

const ArtShow = ({ match }) => {
  const [art, setArt] = useState({});
  //set loading state, and have a conditional that will either render loading or the actual data. Have the update occur during use effect

  useEffect(() => {
    showArt(match.params.id).then((resp) => setArt(resp.data));
  },[match.params.id]);

  console.log(art)

  return (
    <div className="container">
      <div className="imagecontainer">
        <img className="ui fluid image" src={`https://ipfs.io/ipfs/${art.cid}`} alt={art.description}/>
      </div>
      Name: <h2>{art.name}</h2>
      Caption: <h2>{art.caption}</h2>
      Description: <h2>{art.description}</h2>
      Owner: <h2>{art.user?.username}</h2>
      Created by: <h2>{art.artist?.name}</h2>
      Artwork CID: <h2>{art.cid}</h2>
      Token URI: <h2>{art.tokenURI}</h2>
      Token ID: <h2>{art.tokenID}</h2>
      ERC721 Contract: <h2>{art.contract_address}</h2>

    </div>
  );
};

export default ArtShow;
