import React, { useEffect, useState } from "react";
import { showArt } from "../../actions/";

const ArtShow = ({ match }) => {
  const [art, setArt] = useState({});

  useEffect(() => {
    showArt(match.params.id).then((resp) => setArt(resp.data));
  },[]);

  console.log(art)

  return (
    <div className="container">
      <div className="imagecontainer">
        <img class="ui fluid image" src={`https://ipfs.io/ipfs/${art.cid}`} />
      </div>
      Caption: <h2>{art.caption}</h2>
      Posted by: <h2>{art.artist.name}</h2>
      Artwork CID: <h2>{art.cid}</h2>
      Token URI:
    </div>
  );
};

export default ArtShow;
