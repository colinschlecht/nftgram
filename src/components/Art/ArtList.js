import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { explore, resetAllLoaded, loadingArts } from "../../actions";
import { ArtCard } from "./ArtCard";
import { LoadingArt } from "./LoadingArt";
import { FullLoaded } from "./FullLoaded";
import Dummy from "./Dummy";

const ArtList = () => {
  const dispatch = useDispatch();
  //state incremented with every fetch
  const page = useSelector((state) => state.art.page);
  //indicates if a fetch was initiated, changed during loadingArts and explore actions
  const loading = useSelector((state) => state.art.loading);
  //when api fetch < art per page fetch
  const allLoaded = useSelector((state) => state.art.allLoaded);
  //array of art objects
  const arts = useSelector((state) => state.art.arts);
  

  // initial fetch for comonent mounting
  useEffect(() => {
    if (page === 0) {
      dispatch(explore(page));
    }
  }, [page, dispatch]);

  //checks if art-container element bottom is within window height
  const isBottom = (el) => {
    console.log(window.innerHeight);
    console.log(el.getBoundingClientRect().bottom);
    return (
      el.getBoundingClientRect().bottom <= window.innerHeight ||
      el.getBoundingClientRect().bottom - window.innerHeight < 1
    );
  };

  //callback for whether or not to fetch during scroll
  const trackScroll = useCallback(() => {
    const wrappedElement = document.getElementById("arts-container");
    if (isBottom(wrappedElement) && !loading) {
      dispatch(loadingArts());
      dispatch(explore(page));
    }
  }, [page, dispatch, loading]);

  //add or remove event listener for scrolling
  useEffect(() => {
    if (!allLoaded) document.addEventListener("scroll", trackScroll);
    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, [trackScroll, allLoaded, dispatch]);

  // reset state on component unmount
  useEffect(() => {
    return () => dispatch(resetAllLoaded());
  }, [dispatch]);

  const dummyArr = [1, 2, 3, 4];
  return (
    <>
      {!page ? (
        <div id="arts-container">
          <div className="ui column centered grid">
            <div className="column">
              {dummyArr.map((dum) => (
                <Dummy key={`dummy ${dum}`} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div id="arts-container">
          <div className="ui column centered grid">
            <div className="column">
              {arts.map((art) => (
                <ArtCard page={page} key={art.id} art={art} />
              ))}
              {allLoaded && <FullLoaded />}
            </div>
          </div>
          {loading && <LoadingArt />}
        </div>
      )}
    </>
  );
};

export default ArtList;
