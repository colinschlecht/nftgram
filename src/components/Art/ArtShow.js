import React, { useEffect } from "react";
import { showArt } from "../../actions/";
import { useDispatch, useSelector } from "react-redux";

import ArtShowCard from "./ArtShowCard";

const ArtShow = ({ match }) => {
  const dispatch = useDispatch();
  const art = useSelector((state) =>
    !!state.art.art.id ? state.art.art : false
  );
  console.log(art);

  useEffect(() => {
    if (!art) {
      dispatch(showArt(match.params.id));
    }
  });

  return <>{art && <ArtShowCard art={art} />}</>;
};

export default ArtShow;
