import React, { useEffect, useState } from "react";
import { showArt } from "../../actions/";

const ArtShow = ({ match }) => {
    const [art, setArt] = useState({})
  
useEffect(() => {
    showArt(match.params.id).then(resp => setArt(resp.data))
})
  
  return <div>{art.caption}</div>;
};

export default ArtShow;
